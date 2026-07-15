import { fieldsToJsonSchema } from "./fields.js";
import { CRUD_TO_IXCSOFT } from "./operations.js";
export function buildMeta(entity) {
    const operations = [];
    for (const [name, cfg] of Object.entries(entity.ops)) {
        if (!cfg)
            continue;
        operations.push({
            kind: "crud",
            name,
            path: entity.table,
            ixcsoft: CRUD_TO_IXCSOFT[name],
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
