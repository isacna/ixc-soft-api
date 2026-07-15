import fetch from "node-fetch";
import { IxcRequestOperation } from "./operations";

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
export async function ixcCall<T = unknown>(
  ctx: RequestContext,
  path: string,
  opts: IxcCallOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: ctx.token,
    ...(opts.ixcsoft ? { ixcsoft: opts.ixcsoft } : {}),
    ...opts.headers,
  };

  const doFetch = ctx.fetchImpl ?? fetch;
  const response = await doFetch(`${ctx.url}/webservice/v1/${path}`, {
    method: opts.method ?? "POST",
    body: JSON.stringify(opts.body ?? {}),
    headers,
  });

  if (!response.ok) {
    throw new Error(`IXC request failed with status ${response.status} for /${path}`);
  }

  return (await response.json()) as T;
}
