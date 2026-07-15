import { ixcCall } from "../core/transport.js";
/**
 * Back-compat shim: the legacy service wrappers still call this. Behavior is
 * unchanged — POST `/webservice/v1/{table}` with the `ixcsoft` header — it just
 * routes through the shared {@link ixcCall} transport now.
 */
export async function ixcRequest({ url, token, table, operation, body = {}, }) {
    return ixcCall({ url, token }, table, { ixcsoft: operation, body });
}
export { parseMutationResponse, parseReadResponse } from "../core/normalize.js";
