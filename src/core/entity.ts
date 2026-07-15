import type { FieldsSpec, InferRecord } from "./fields";
import type { IxcRequestOperation } from "./operations";
import type { ListResult, MutationResult } from "./normalize";
import type { EntityMeta } from "./meta";

export type CrudOpName = "list" | "get" | "create" | "update" | "delete";

export interface OpConfig<I extends FieldsSpec = FieldsSpec> {
  /** Caller-facing params descriptor (drives typing + JSON Schema + validation). */
  input?: I;
  /** Maps the friendly (camelCase) input to the IXC wire body. Default: identity. */
  toBody?: (input: InferRecord<I>) => Record<string, unknown>;
  description?: string;
}

export interface ActionDef<
  I extends FieldsSpec = FieldsSpec,
  O extends FieldsSpec = FieldsSpec
> {
  /** Segment after `/webservice/v1/`, ex.: "get_boleto". */
  path: string;
  /** Set only if the action needs the CRUD `ixcsoft` header (usually omitted). */
  ixcsoft?: IxcRequestOperation;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  input: I;
  output?: O;
  toBody?: (input: InferRecord<I>) => Record<string, unknown>;
  /** Maps the raw IXC response to the typed output. Default: pass through raw. */
  fromResponse?: (raw: unknown) => InferRecord<O>;
  description?: string;
}

export interface EntityDef<
  RF extends FieldsSpec = FieldsSpec,
  Ops extends Partial<Record<CrudOpName, OpConfig<any>>> = Partial<Record<CrudOpName, OpConfig<any>>>,
  Actions extends Record<string, ActionDef<any, any>> = Record<string, ActionDef<any, any>>
> {
  name: string;
  table: string;
  description?: string;
  record: RF;
  ops: Ops;
  actions: Actions;
}

/**
 * Per-op builder. Its sole job is to give `toBody`'s parameter a contextual type
 * inferred from `input` (a bare object literal inside `defineEntity` wouldn't get
 * one). `const I` preserves the literal field descriptor.
 */
export function op<const I extends FieldsSpec = FieldsSpec>(config: OpConfig<I>): OpConfig<I> {
  return config;
}

/** Per-action builder — types `toBody`/`fromResponse` from `input`/`output`. */
export function action<const I extends FieldsSpec, const O extends FieldsSpec = FieldsSpec>(
  config: ActionDef<I, O>
): ActionDef<I, O> {
  return config;
}

/**
 * `const` type params (TS 5.0+) capture the exact literal shape of `ops`/`actions`
 * so the generated client type exposes only the declared operations. Without
 * `const`, keys widen to `string` and the mapped type drops every method.
 */
export function defineEntity<
  const RF extends FieldsSpec,
  const Ops extends Partial<Record<CrudOpName, OpConfig<any>>> = {},
  const Actions extends Record<string, ActionDef<any, any>> = {}
>(def: {
  name: string;
  table: string;
  description?: string;
  record: RF;
  ops?: Ops;
  actions?: Actions;
}): EntityDef<RF, Ops, Actions> {
  return {
    name: def.name,
    table: def.table,
    description: def.description,
    record: def.record,
    ops: (def.ops ?? {}) as Ops,
    actions: (def.actions ?? {}) as Actions,
  };
}

type InInput<C> = C extends { input?: infer I }
  ? NonNullable<I> extends FieldsSpec
    ? InferRecord<NonNullable<I>>
    : Record<string, unknown>
  : Record<string, unknown>;

type CrudMethod<K extends CrudOpName, RF extends FieldsSpec, C> = K extends "list"
  ? (input: InInput<C>) => Promise<ListResult<InferRecord<RF>>>
  : K extends "get"
  ? (input: InInput<C>) => Promise<InferRecord<RF> | null>
  : (input: InInput<C>) => Promise<MutationResult>;

type ActionOut<D> = D extends { output?: infer O }
  ? NonNullable<O> extends FieldsSpec
    ? InferRecord<NonNullable<O>> & Record<string, unknown>
    : Record<string, unknown>
  : Record<string, unknown>;

type ActionMethod<D> = (input: InInput<D>) => Promise<ActionOut<D>>;

/** The typed namespace client generated from an {@link EntityDef}. */
export type EntityClient<E extends EntityDef<any, any, any>> = {
  [K in keyof E["ops"] as K extends CrudOpName ? K : never]-?: K extends CrudOpName
    ? CrudMethod<K, E["record"], E["ops"][K]>
    : never;
} & {
  [K in keyof E["actions"]]: ActionMethod<E["actions"][K]>;
} & {
  readonly __meta: EntityMeta;
};
