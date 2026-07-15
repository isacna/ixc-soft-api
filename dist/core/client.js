import { ixcCall } from "./transport.js";
import { crudRequest } from "./crud.js";
import { validate } from "./fields.js";
import { normalizeList, normalizeMutation } from "./normalize.js";
import { buildMeta } from "./meta.js";
/** Builds the runtime namespace client that fulfills {@link EntityClient}. */
export function createEntityClient(entity, ctx) {
    const client = {};
    for (const [op, cfg] of Object.entries(entity.ops)) {
        if (!cfg)
            continue;
        client[op] = async (input) => {
            const parsed = cfg.input ? validate(cfg.input, input) : (input ?? {});
            let body = cfg.toBody ? cfg.toBody(parsed) : parsed;
            if (op === "get")
                body = { rp: "1", ...body };
            const raw = await crudRequest(ctx, entity.table, op, body);
            if (op === "list")
                return normalizeList(raw);
            if (op === "get")
                return normalizeList(raw).registros[0] ?? null;
            return normalizeMutation(raw);
        };
    }
    for (const [name, def] of Object.entries(entity.actions)) {
        client[name] = async (input) => {
            const parsed = validate(def.input, input);
            const body = def.toBody ? def.toBody(parsed) : parsed;
            const raw = await ixcCall(ctx, def.path, { method: def.method, ixcsoft: def.ixcsoft, body });
            return def.fromResponse ? def.fromResponse(raw) : raw;
        };
    }
    Object.defineProperty(client, "__meta", { value: buildMeta(entity), enumerable: false });
    return client;
}
