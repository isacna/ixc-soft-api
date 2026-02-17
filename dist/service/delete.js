import { ixcRequest, parseMutationResponse } from "./request.js";
export async function deleteRecord(url, token, table, body) {
    const response = await ixcRequest({ url, token, table, operation: "deletar", body });
    return parseMutationResponse(response);
}
