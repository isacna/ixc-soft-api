import { ixcRequest, parseReadResponse } from "./request.js";
export async function readRecord(url, token, table, body) {
    const response = await ixcRequest({ url, token, table, operation: "obter", body });
    return parseReadResponse(response);
}
