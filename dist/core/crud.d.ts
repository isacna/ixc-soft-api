import { RequestContext } from "./transport.js";
import { CrudOp } from "./operations.js";
/** CRUD semantics on top of {@link ixcCall}: table path + `ixcsoft` header. */
export declare function crudRequest<T = unknown>(ctx: RequestContext, table: string, op: CrudOp, body?: unknown): Promise<T>;
