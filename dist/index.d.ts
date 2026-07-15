import { BodyRaw, FilterParams, IXC_Auth, IxcListResponse, IxcMutationResponse, IxcReadResponse, Return_Auth } from "./@types/types.js";
import { Namespaces } from "./entities/index.js";
interface IXC extends Namespaces {
}
declare class IXC {
    url: string;
    authenticate: Return_Auth;
    private ctx;
    constructor({ url, credentials }: {
        url: string;
        credentials: IXC_Auth;
    });
    list(table: string, body: BodyRaw): Promise<IxcListResponse>;
    listFilter(table: string, filter: FilterParams[]): Promise<IxcListResponse>;
    read(table: string, body: Record<string, unknown>): Promise<IxcReadResponse>;
    create(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
    update(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
    delete(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
}
export default IXC;
export { defineEntity } from "./core/entity.js";
export type { EntityDef, EntityClient, ActionDef, OpConfig } from "./core/entity.js";
export type { EntityMeta, OperationMeta } from "./core/meta.js";
export type { FieldSpec, FieldsSpec, JsonSchema } from "./core/fields.js";
export { buildGridParam } from "./core/filters.js";
export type { GridFilter, IxcOperator } from "./core/filters.js";
export { registry } from "./entities/index.js";
export type { Registry, Namespaces } from "./entities/index.js";
