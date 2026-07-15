import { ixcCall, RequestContext } from "./transport";
import { crudRequest } from "./crud";
import { validate } from "./fields";
import { normalizeList, normalizeMutation } from "./normalize";
import { buildMeta } from "./meta";
import { ActionDef, CrudOpName, EntityClient, EntityDef, OpConfig } from "./entity";

/** Builds the runtime namespace client that fulfills {@link EntityClient}. */
export function createEntityClient<E extends EntityDef<any, any, any>>(
  entity: E,
  ctx: RequestContext
): EntityClient<E> {
  const client: Record<string, unknown> = {};

  for (const [op, cfg] of Object.entries(entity.ops) as [CrudOpName, OpConfig | undefined][]) {
    if (!cfg) continue;
    client[op] = async (input: unknown) => {
      const parsed = cfg.input ? validate(cfg.input, input) : ((input ?? {}) as Record<string, unknown>);
      let body = cfg.toBody ? cfg.toBody(parsed as never) : (parsed as Record<string, unknown>);
      if (op === "get") body = { rp: "1", ...body };
      const raw = await crudRequest(ctx, entity.table, op, body);
      if (op === "list") return normalizeList(raw);
      if (op === "get") return normalizeList(raw).registros[0] ?? null;
      return normalizeMutation(raw);
    };
  }

  for (const [name, def] of Object.entries(entity.actions) as [string, ActionDef][]) {
    client[name] = async (input: unknown) => {
      const parsed = validate(def.input, input);
      const body = def.toBody ? def.toBody(parsed as never) : (parsed as Record<string, unknown>);
      const raw = await ixcCall(ctx, def.path, { method: def.method, ixcsoft: def.ixcsoft, body });
      return def.fromResponse ? def.fromResponse(raw) : raw;
    };
  }

  Object.defineProperty(client, "__meta", { value: buildMeta(entity), enumerable: false });
  return client as unknown as EntityClient<E>;
}
