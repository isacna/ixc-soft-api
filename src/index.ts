import {
  BodyRaw,
  FilterParams,
  IXC_Auth,
  IxcListResponse,
  IxcMutationResponse,
  IxcReadResponse,
  Return_Auth,
} from "./@types/types";
import { auth } from "./service/auth";
import { concatenatedFilter } from "./service/concatenatedFilter";
import { createRecord } from "./service/create";
import { deleteRecord } from "./service/delete";
import { listAll } from "./service/list";
import { readRecord } from "./service/read";
import { updateRecord } from "./service/update";
import { RequestContext } from "./core/transport";
import { createEntityClient } from "./core/client";
import { registry, Namespaces } from "./entities/index";

// Declaration merge: gives the class the typed entity namespaces (ixc.boleto,
// ixc.cliente, ...) without per-entity fields or strictPropertyInitialization
// errors. The constructor populates them at runtime from `registry`.
interface IXC extends Namespaces {}

class IXC {
  public url: string;
  public authenticate: Return_Auth;
  private ctx: RequestContext;

  constructor({ url, credentials }: { url: string; credentials: IXC_Auth }) {
    this.url = url;
    this.authenticate = auth(credentials);
    this.ctx = { url, token: this.authenticate.token };

    const table = registry as Record<string, Parameters<typeof createEntityClient>[0]>;
    for (const key of Object.keys(table)) {
      (this as Record<string, unknown>)[key] = createEntityClient(table[key], this.ctx);
    }
  }

  // ---- Generic API (unchanged, back-compatible) ----------------------------

  async list(table: string, body: BodyRaw): Promise<IxcListResponse> {
    return await listAll(this.url, this.authenticate.token, table, body);
  }

  async listFilter(table: string, filter: FilterParams[]): Promise<IxcListResponse> {
    return await concatenatedFilter(this.url, this.authenticate.token, table, filter);
  }

  async read(table: string, body: Record<string, unknown>): Promise<IxcReadResponse> {
    return await readRecord(this.url, this.authenticate.token, table, body);
  }

  async create(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await createRecord(this.url, this.authenticate.token, table, body);
  }

  async update(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await updateRecord(this.url, this.authenticate.token, table, body);
  }

  async delete(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await deleteRecord(this.url, this.authenticate.token, table, body);
  }
}

export default IXC;

// Public surface for building on top of the SDK (and a future MCP server).
export { defineEntity } from "./core/entity";
export type { EntityDef, EntityClient, ActionDef, OpConfig } from "./core/entity";
export type { EntityMeta, OperationMeta } from "./core/meta";
export type { FieldSpec, FieldsSpec, JsonSchema } from "./core/fields";
export { buildGridParam } from "./core/filters";
export type { GridFilter, IxcOperator } from "./core/filters";
export { registry } from "./entities/index";
export type { Registry, Namespaces } from "./entities/index";
