export interface ListResult<T = Record<string, unknown>> {
  status?: string;
  total?: number;
  registros: T[];
}

export interface MutationResult {
  status?: string;
  type?: string;
  message?: string;
  id?: string;
  [key: string]: unknown;
}

function messageOf(o: Record<string, unknown>): string | undefined {
  if (typeof o.message === "string") return o.message;
  if (typeof o.mensagem === "string") return o.mensagem;
  return undefined;
}

// ---------------------------------------------------------------------------
// Legacy shapes — kept byte-compatible for the back-compat service wrappers.
// ---------------------------------------------------------------------------

export function parseMutationResponse(response: unknown): {
  status?: string;
  type?: string;
  message?: string;
  data?: Record<string, unknown>;
} {
  const typed = (response ?? {}) as Record<string, unknown>;
  return {
    status: typeof typed.status === "string" ? typed.status : undefined,
    type: typeof typed.type === "string" ? typed.type : undefined,
    message: messageOf(typed),
    data: typed,
  };
}

export function parseReadResponse(response: unknown): {
  status?: string;
  message?: string;
  registro?: unknown;
} {
  const typed = (response ?? {}) as Record<string, unknown>;
  return {
    status: typeof typed.status === "string" ? typed.status : undefined,
    message: messageOf(typed),
    registro: typed.registro ?? typed,
  };
}

// ---------------------------------------------------------------------------
// Engine normalizers — permissive: never throw on unknown/extra fields.
// ---------------------------------------------------------------------------

export function normalizeList<T = Record<string, unknown>>(raw: unknown): ListResult<T> {
  const o = (raw ?? {}) as Record<string, unknown>;
  const registros = Array.isArray(o.registros) ? (o.registros as T[]) : [];
  const total = Number(o.total);
  return {
    status: registros.length > 0 ? "success" : "error",
    total: Number.isFinite(total) ? total : registros.length,
    registros,
  };
}

export function normalizeMutation(raw: unknown): MutationResult {
  const o = (raw ?? {}) as Record<string, unknown>;
  const id = o.id;
  return {
    ...o,
    status: typeof o.status === "string" ? o.status : undefined,
    type: typeof o.type === "string" ? o.type : undefined,
    message: messageOf(o),
    id: id === undefined || id === null ? undefined : String(id),
  };
}
