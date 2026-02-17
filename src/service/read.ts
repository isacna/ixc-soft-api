import { IxcReadResponse } from "../@types/types";
import { ixcRequest, parseReadResponse } from "./request";

export async function readRecord(
  url: string,
  token: string,
  table: string,
  body: Record<string, unknown>
): Promise<IxcReadResponse> {
  const response = await ixcRequest({ url, token, table, operation: "obter", body });
  return parseReadResponse(response);
}
