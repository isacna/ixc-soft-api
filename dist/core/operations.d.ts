/** The `ixcsoft` header value that selects the CRUD operation on a table. */
export type IxcRequestOperation = "listar" | "obter" | "incluir" | "alterar" | "deletar";
/** Logical CRUD operation names exposed by the entity engine. */
export type CrudOp = "list" | "get" | "create" | "update" | "delete";
/**
 * Maps a logical op to the `ixcsoft` header value.
 * Note `get` maps to `listar`: the reliable "get by id" in IXC is a filtered
 * list taking the first record (there is no dedicated single-record verb that
 * behaves consistently across tables) — this mirrors the proven ixc-mcp client.
 */
export declare const CRUD_TO_IXCSOFT: Record<CrudOp, IxcRequestOperation>;
