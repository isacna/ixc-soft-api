import { FilterParams, IxcListResponse } from "../@types/types";
import { ixcRequest } from "./request";

export async function concatenatedFilter(url: string, token: string, table: string, filter: FilterParams[]): Promise<IxcListResponse> {
  const body = {
    rp: "100000",
    grid_param: JSON.stringify(filter),
  };

  const response = await ixcRequest<Record<string, unknown>>({
    url,
    token,
    table,
    operation: "listar",
    body,
  });

  if (Array.isArray(response.registros) && response.registros.length > 0) {
    return {
      status: "success",
      total: Number(response.total || 0),
      registros: response.registros,
    };
  }

  if (Number(response.total || 0) === 0) {
    return {
      status: "error",
      total: 0,
      registros: [],
    };
  }

  throw new Error(`Unrecognized response from IXC: ${JSON.stringify(response)}`);
}
