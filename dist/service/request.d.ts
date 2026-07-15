import { IxcRequestOperation } from "../@types/types.js";
interface RequestOptions {
    url: string;
    token: string;
    table: string;
    operation: IxcRequestOperation;
    body?: unknown;
}
/**
 * Back-compat shim: the legacy service wrappers still call this. Behavior is
 * unchanged — POST `/webservice/v1/{table}` with the `ixcsoft` header — it just
 * routes through the shared {@link ixcCall} transport now.
 */
export declare function ixcRequest<T = unknown>({ url, token, table, operation, body, }: RequestOptions): Promise<T>;
export { parseMutationResponse, parseReadResponse } from "../core/normalize.js";
