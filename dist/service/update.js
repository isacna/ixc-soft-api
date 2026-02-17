import { ixcRequest, parseMutationResponse } from "./request.js";
export async function updateRecord(url, token, table, body) {
    const response = await ixcRequest({ url, token, table, operation: "alterar", body });
    return parseMutationResponse(response);
}
