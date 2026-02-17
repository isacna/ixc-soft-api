import { ixcRequest, parseMutationResponse } from "./request.js";
export async function createRecord(url, token, table, body) {
    const response = await ixcRequest({ url, token, table, operation: "incluir", body });
    return parseMutationResponse(response);
}
