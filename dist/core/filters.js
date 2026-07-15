/** Serializes composite filters into IXC's `grid_param` JSON string. */
export function buildGridParam(filters) {
    return JSON.stringify(filters.map((f) => ({
        TB: f.field,
        OP: f.operator ?? "=",
        P: String(f.value),
        C: f.connector ?? "AND",
        G: f.field,
    })));
}
