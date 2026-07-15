function messageOf(o) {
    if (typeof o.message === "string")
        return o.message;
    if (typeof o.mensagem === "string")
        return o.mensagem;
    return undefined;
}
// ---------------------------------------------------------------------------
// Legacy shapes — kept byte-compatible for the back-compat service wrappers.
// ---------------------------------------------------------------------------
export function parseMutationResponse(response) {
    const typed = (response ?? {});
    return {
        status: typeof typed.status === "string" ? typed.status : undefined,
        type: typeof typed.type === "string" ? typed.type : undefined,
        message: messageOf(typed),
        data: typed,
    };
}
export function parseReadResponse(response) {
    const typed = (response ?? {});
    return {
        status: typeof typed.status === "string" ? typed.status : undefined,
        message: messageOf(typed),
        registro: typed.registro ?? typed,
    };
}
// ---------------------------------------------------------------------------
// Engine normalizers — permissive: never throw on unknown/extra fields.
// ---------------------------------------------------------------------------
export function normalizeList(raw) {
    const o = (raw ?? {});
    const registros = Array.isArray(o.registros) ? o.registros : [];
    const total = Number(o.total);
    return {
        status: registros.length > 0 ? "success" : "error",
        total: Number.isFinite(total) ? total : registros.length,
        registros,
    };
}
export function normalizeMutation(raw) {
    const o = (raw ?? {});
    const id = o.id;
    return {
        ...o,
        status: typeof o.status === "string" ? o.status : undefined,
        type: typeof o.type === "string" ? o.type : undefined,
        message: messageOf(o),
        id: id === undefined || id === null ? undefined : String(id),
    };
}
