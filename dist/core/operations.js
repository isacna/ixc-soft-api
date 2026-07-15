/**
 * Maps a logical op to the `ixcsoft` header value.
 * Note `get` maps to `listar`: the reliable "get by id" in IXC is a filtered
 * list taking the first record (there is no dedicated single-record verb that
 * behaves consistently across tables) — this mirrors the proven ixc-mcp client.
 */
export const CRUD_TO_IXCSOFT = {
    list: "listar",
    get: "listar",
    create: "incluir",
    update: "alterar",
    delete: "deletar",
};
