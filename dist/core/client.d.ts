import { RequestContext } from "./transport.js";
import { EntityClient, EntityDef } from "./entity.js";
/** Builds the runtime namespace client that fulfills {@link EntityClient}. */
export declare function createEntityClient<E extends EntityDef<any, any, any>>(entity: E, ctx: RequestContext): EntityClient<E>;
