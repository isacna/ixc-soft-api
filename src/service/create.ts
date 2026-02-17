import { IxcMutationResponse } from "../@types/types";
import { ixcRequest, parseMutationResponse } from "./request";

export async function createRecord(
  url: string,
  token: string,
  table: string,
  body: Record<string, unknown>
): Promise<IxcMutationResponse> {
  const response = await ixcRequest({ url, token, table, operation: "incluir", body });
  return parseMutationResponse(response);
}
