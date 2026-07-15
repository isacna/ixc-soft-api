/**
 * Zero-dependency field descriptor: a single `as const` declaration is the one
 * source of truth from which we derive the static TS type (type-level, via
 * {@link InferRecord}) and, at runtime, the JSON Schema ({@link fieldsToJsonSchema})
 * and validation ({@link validate}). No schema library.
 */
export interface FieldSpec {
  type: "string" | "number" | "boolean";
  optional?: boolean;
  description?: string;
  enum?: readonly (string | number)[];
}

export type FieldsSpec = Record<string, FieldSpec>;

type Scalar<F extends FieldSpec> = F extends { enum: readonly (infer E)[] }
  ? E
  : F["type"] extends "string"
  ? string
  : F["type"] extends "number"
  ? number
  : F["type"] extends "boolean"
  ? boolean
  : never;

/** Descriptor → record type; fields with `optional: true` become `?`. */
export type InferRecord<S extends FieldsSpec> = {
  [K in keyof S as S[K] extends { optional: true } ? never : K]: Scalar<S[K]>;
} & {
  [K in keyof S as S[K] extends { optional: true } ? K : never]?: Scalar<S[K]>;
};

export interface JsonSchema {
  type: "object";
  properties: Record<string, unknown>;
  required?: string[];
  additionalProperties: boolean;
}

/** Descriptor → JSON Schema (consumed by a future MCP server for tool schemas). */
export function fieldsToJsonSchema(fields: FieldsSpec): JsonSchema {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const [key, spec] of Object.entries(fields)) {
    const prop: Record<string, unknown> = { type: spec.type };
    if (spec.description) prop.description = spec.description;
    if (spec.enum) prop.enum = spec.enum;
    properties[key] = prop;
    if (!spec.optional) required.push(key);
  }

  return {
    type: "object",
    properties,
    ...(required.length ? { required } : {}),
    additionalProperties: true,
  };
}

function coerce(key: string, spec: FieldSpec, value: unknown): unknown {
  if (spec.enum && !spec.enum.includes(value as string | number)) {
    throw new Error(`Campo "${key}" deve ser um de: ${spec.enum.join(", ")}`);
  }

  switch (spec.type) {
    case "string":
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      throw new Error(`Campo "${key}" deve ser string`);
    case "number":
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
        return Number(value);
      }
      throw new Error(`Campo "${key}" deve ser número`);
    case "boolean":
      if (typeof value === "boolean") return value;
      if (value === "true") return true;
      if (value === "false") return false;
      throw new Error(`Campo "${key}" deve ser boolean`);
  }
}

/**
 * Validates/coerces declared fields (strict: throws on missing required or bad
 * type) while passing through undeclared keys unchanged (no silent data loss).
 */
export function validate<S extends FieldsSpec>(fields: S, input: unknown): InferRecord<S> {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = { ...src };

  for (const [key, spec] of Object.entries(fields)) {
    const value = src[key];
    if (value === undefined || value === null) {
      if (!spec.optional) throw new Error(`Campo obrigatório ausente: "${key}"`);
      delete out[key];
      continue;
    }
    out[key] = coerce(key, spec, value);
  }

  return out as InferRecord<S>;
}
