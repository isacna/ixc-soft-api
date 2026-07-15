import { ixcCall, RequestContext } from "./transport";
import { CRUD_TO_IXCSOFT, CrudOp } from "./operations";

/** CRUD semantics on top of {@link ixcCall}: table path + `ixcsoft` header. */
export function crudRequest<T = unknown>(
  ctx: RequestContext,
  table: string,
  op: CrudOp,
  body?: unknown
): Promise<T> {
  return ixcCall<T>(ctx, table, { ixcsoft: CRUD_TO_IXCSOFT[op], body });
}
