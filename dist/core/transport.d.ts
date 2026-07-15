import fetch from "node-fetch";
import { IxcRequestOperation } from "./operations.js";
export interface RequestContext {
    url: string;
    token: string;
    /** Injectable fetch — for tests or to swap in Node 18+ global fetch later. */
    fetchImpl?: typeof fetch;
}
export interface IxcCallOptions {
    /** HTTP verb. Defaults to POST (the IXC WebService v1 default). */
    method?: "GET" | "POST" | "PUT" | "DELETE";
    /** CRUD op → sets the `ixcsoft` header. OMIT for action endpoints (get_boleto). */
    ixcsoft?: IxcRequestOperation;
    body?: unknown;
    headers?: Record<string, string>;
}
/**
 * The single HTTP primitive. `path` is arbitrary (`fn_areceber` OR `get_boleto`)
 * and `ixcsoft` is optional — header presence is data, not hardcoded. Both the
 * CRUD helpers and header-less action endpoints build on this.
 */
export declare function ixcCall<T = unknown>(ctx: RequestContext, path: string, opts?: IxcCallOptions): Promise<T>;
