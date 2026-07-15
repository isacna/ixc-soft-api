import fetch from "node-fetch";
/**
 * The single HTTP primitive. `path` is arbitrary (`fn_areceber` OR `get_boleto`)
 * and `ixcsoft` is optional — header presence is data, not hardcoded. Both the
 * CRUD helpers and header-less action endpoints build on this.
 */
export async function ixcCall(ctx, path, opts = {}) {
    const headers = {
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
    return (await response.json());
}
