import { EntityDef } from "./entity.js";
import { JsonSchema } from "./fields.js";
import { IxcRequestOperation } from "./operations.js";
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
export declare function buildMeta(entity: EntityDef): EntityMeta;
