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
type Scalar<F extends FieldSpec> = F extends {
    enum: readonly (infer E)[];
} ? E : F["type"] extends "string" ? string : F["type"] extends "number" ? number : F["type"] extends "boolean" ? boolean : never;
/** Descriptor → record type; fields with `optional: true` become `?`. */
export type InferRecord<S extends FieldsSpec> = {
    [K in keyof S as S[K] extends {
        optional: true;
    } ? never : K]: Scalar<S[K]>;
} & {
    [K in keyof S as S[K] extends {
        optional: true;
    } ? K : never]?: Scalar<S[K]>;
};
export interface JsonSchema {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties: boolean;
}
/** Descriptor → JSON Schema (consumed by a future MCP server for tool schemas). */
export declare function fieldsToJsonSchema(fields: FieldsSpec): JsonSchema;
/**
 * Validates/coerces declared fields (strict: throws on missing required or bad
 * type) while passing through undeclared keys unchanged (no silent data loss).
 */
export declare function validate<S extends FieldsSpec>(fields: S, input: unknown): InferRecord<S>;
export {};
