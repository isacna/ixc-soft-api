import { defineEntity, op } from "../core/entity.js";
import { buildGridParam } from "../core/filters.js";
/** Filial. Subconjunto útil das 135 colunas de `filial`. */
const filialRecord = {
    id: { type: "string", description: "ID da filial" },
    ativo: { type: "string", optional: true, description: "S/N" },
    id_empresa: { type: "string", optional: true },
    razao: { type: "string", optional: true },
    fantasia: { type: "string", optional: true },
    cnpj: { type: "string", optional: true },
    ie: { type: "string", optional: true },
    im: { type: "string", optional: true },
    tipo_pessoa: { type: "string", optional: true },
    endereco: { type: "string", optional: true },
    numero: { type: "string", optional: true },
    bairro: { type: "string", optional: true },
    cidade: { type: "string", optional: true },
    cep: { type: "string", optional: true },
    telefone: { type: "string", optional: true },
    email: { type: "string", optional: true },
    site: { type: "string", optional: true },
};
export const filialEntity = defineEntity({
    name: "filial",
    table: "filial",
    description: "Filiais do provedor.",
    record: filialRecord,
    ops: {
        list: op({
            input: {
                ativo: { type: "string", optional: true, description: "S/N" },
                rp: { type: "number", optional: true },
            },
            toBody: (v) => {
                const filters = [];
                if (v.ativo)
                    filters.push({ field: "filial.ativo", value: v.ativo });
                const body = { rp: String(v.rp ?? 100) };
                if (filters.length)
                    body.grid_param = buildGridParam(filters);
                return body;
            },
            description: "Lista filiais.",
        }),
        get: op({
            input: { id: { type: "number", description: "ID da filial" } },
            toBody: (v) => ({ qtype: "filial.id", query: String(v.id), oper: "=" }),
            description: "Obtém uma filial por id.",
        }),
    },
});
