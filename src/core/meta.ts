import { EntityDef } from "./entity";
import { fieldsToJsonSchema, JsonSchema } from "./fields";
import { CRUD_TO_IXCSOFT, CrudOp, IxcRequestOperation } from "./operations";

/**
 * Runtime descriptor of one operation. `inputSchema`/`outputSchema` are already
 * JSON Schema, so a future MCP server emits tools straight from `__meta` with no
 * extra dependency.
 */
export interface OperationMeta {
  kind: "crud" | "action";
  name: string;
  /** table (CRUD) or action path ("get_boleto") */
  path: string;
  ixcsoft?: IxcRequestOperation;
  description?: string;
  inputSchema: JsonSchema;
  outputSchema?: JsonSchema;
}

export interface EntityMeta {
  name: string;
  table: string;
  description?: string;
  operations: OperationMeta[];
}

export function buildMeta(entity: EntityDef): EntityMeta {
  const operations: OperationMeta[] = [];

  for (const [name, cfg] of Object.entries(entity.ops)) {
    if (!cfg) continue;
    operations.push({
      kind: "crud",
      name,
      path: entity.table,
      ixcsoft: CRUD_TO_IXCSOFT[name as CrudOp],
      description: cfg.description,
      inputSchema: fieldsToJsonSchema(cfg.input ?? {}),
    });
  }

  for (const [name, def] of Object.entries(entity.actions)) {
    operations.push({
      kind: "action",
      name,
      path: def.path,
      ixcsoft: def.ixcsoft,
      description: def.description,
      inputSchema: fieldsToJsonSchema(def.input),
      outputSchema: def.output ? fieldsToJsonSchema(def.output) : undefined,
    });
  }

  return {
    name: entity.name,
    table: entity.table,
    description: entity.description,
    operations,
  };
}
