/**
 * Per-op builder. Its sole job is to give `toBody`'s parameter a contextual type
 * inferred from `input` (a bare object literal inside `defineEntity` wouldn't get
 * one). `const I` preserves the literal field descriptor.
 */
export function op(config) {
    return config;
}
/** Per-action builder — types `toBody`/`fromResponse` from `input`/`output`. */
export function action(config) {
    return config;
}
/**
 * `const` type params (TS 5.0+) capture the exact literal shape of `ops`/`actions`
 * so the generated client type exposes only the declared operations. Without
 * `const`, keys widen to `string` and the mapped type drops every method.
 */
export function defineEntity(def) {
    return {
        name: def.name,
        table: def.table,
        description: def.description,
        record: def.record,
        ops: (def.ops ?? {}),
        actions: (def.actions ?? {}),
    };
}
