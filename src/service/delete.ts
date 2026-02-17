import { IxcMutationResponse } from "../@types/types";
import { ixcRequest, parseMutationResponse } from "./request";

export async function deleteRecord(
  url: string,
  token: string,
  table: string,
  body: Record<string, unknown>
): Promise<IxcMutationResponse> {
  const response = await ixcRequest({ url, token, table, operation: "deletar", body });
  return parseMutationResponse(response);
}
