/** Descriptor → JSON Schema (consumed by a future MCP server for tool schemas). */
export function fieldsToJsonSchema(fields) {
    const properties = {};
    const required = [];
    for (const [key, spec] of Object.entries(fields)) {
        const prop = { type: spec.type };
        if (spec.description)
            prop.description = spec.description;
        if (spec.enum)
            prop.enum = spec.enum;
        properties[key] = prop;
        if (!spec.optional)
            required.push(key);
    }
    return {
        type: "object",
        properties,
        ...(required.length ? { required } : {}),
        additionalProperties: true,
    };
}
function coerce(key, spec, value) {
    if (spec.enum && !spec.enum.includes(value)) {
        throw new Error(`Campo "${key}" deve ser um de: ${spec.enum.join(", ")}`);
    }
    switch (spec.type) {
        case "string":
            if (typeof value === "string")
                return value;
            if (typeof value === "number" || typeof value === "boolean")
                return String(value);
            throw new Error(`Campo "${key}" deve ser string`);
        case "number":
            if (typeof value === "number")
                return value;
            if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
                return Number(value);
            }
            throw new Error(`Campo "${key}" deve ser número`);
        case "boolean":
            if (typeof value === "boolean")
                return value;
            if (value === "true")
                return true;
            if (value === "false")
                return false;
            throw new Error(`Campo "${key}" deve ser boolean`);
    }
}
/**
 * Validates/coerces declared fields (strict: throws on missing required or bad
 * type) while passing through undeclared keys unchanged (no silent data loss).
 */
export function validate(fields, input) {
    const src = (input && typeof input === "object" ? input : {});
    const out = { ...src };
    for (const [key, spec] of Object.entries(fields)) {
        const value = src[key];
        if (value === undefined || value === null) {
            if (!spec.optional)
                throw new Error(`Campo obrigatório ausente: "${key}"`);
            delete out[key];
            continue;
        }
        out[key] = coerce(key, spec, value);
    }
    return out;
}
