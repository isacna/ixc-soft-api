import fetch from "node-fetch";
import { IxcMutationResponse, IxcReadResponse, IxcRequestOperation } from "../@types/types";

interface RequestOptions {
  url: string;
  token: string;
  table: string;
  operation: IxcRequestOperation;
  body?: unknown;
}

export async function ixcRequest<T = unknown>({
  url,
  token,
  table,
  operation,
  body = {},
}: RequestOptions): Promise<T> {
  const response = await fetch(`${url}/webservice/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ixcsoft: operation,
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(`IXC request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function parseMutationResponse(response: unknown): IxcMutationResponse {
  const typed = response as Record<string, unknown>;
  return {
    status: typeof typed.status === "string" ? typed.status : undefined,
    type: typeof typed.type === "string" ? typed.type : undefined,
    message:
      typeof typed.message === "string"
        ? typed.message
        : typeof typed.mensagem === "string"
        ? typed.mensagem
        : undefined,
    data: typed,
  };
}

export function parseReadResponse(response: unknown): IxcReadResponse {
  const typed = response as Record<string, unknown>;
  return {
    status: typeof typed.status === "string" ? typed.status : undefined,
    message:
      typeof typed.message === "string"
        ? typed.message
        : typeof typed.mensagem === "string"
        ? typed.mensagem
        : undefined,
    registro: typed.registro ?? typed,
  };
}
