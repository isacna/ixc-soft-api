import { ixcCall } from "./transport.js";
import { CRUD_TO_IXCSOFT } from "./operations.js";
/** CRUD semantics on top of {@link ixcCall}: table path + `ixcsoft` header. */
export function crudRequest(ctx, table, op, body) {
    return ixcCall(ctx, table, { ixcsoft: CRUD_TO_IXCSOFT[op], body });
}
