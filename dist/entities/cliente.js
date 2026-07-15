import { defineEntity, op } from "../core/entity.js";
import { buildGridParam } from "../core/filters.js";
/** Cliente. Subconjunto útil das 165 colunas de `cliente` (parsing permissivo). */
const clienteRecord = {
    id: { type: "string", description: "ID do cliente" },
    razao: { type: "string", optional: true, description: "Razão social / nome" },
    fantasia: { type: "string", optional: true },
    cnpj_cpf: { type: "string", optional: true },
    tipo_pessoa: { type: "string", optional: true, description: "F=física, J=jurídica" },
    ativo: { type: "string", optional: true, description: "S/N" },
    email: { type: "string", optional: true },
    fone: { type: "string", optional: true },
    telefone_celular: { type: "string", optional: true },
    whatsapp: { type: "string", optional: true },
    endereco: { type: "string", optional: true },
    numero: { type: "string", optional: true },
    bairro: { type: "string", optional: true },
    cidade: { type: "string", optional: true },
    uf: { type: "string", optional: true },
    cep: { type: "string", optional: true },
    data_cadastro: { type: "string", optional: true },
    id_vendedor: { type: "string", optional: true },
};
export const clienteEntity = defineEntity({
    name: "cliente",
    table: "cliente",
    description: "Clientes do provedor.",
    record: clienteRecord,
    ops: {
        list: op({
            input: {
                razao: { type: "string", optional: true, description: "Contém no nome/razão" },
                cnpjCpf: { type: "string", optional: true, description: "CPF/CNPJ exato" },
                ativo: { type: "string", optional: true, description: "S/N" },
                rp: { type: "number", optional: true },
            },
            toBody: (v) => {
                const filters = [];
                if (v.ativo)
                    filters.push({ field: "cliente.ativo", value: v.ativo });
                if (v.razao)
                    filters.push({ field: "cliente.razao", value: v.razao, operator: "L" });
                if (v.cnpjCpf)
                    filters.push({ field: "cliente.cnpj_cpf", value: v.cnpjCpf });
                const body = { rp: String(v.rp ?? 50) };
                if (filters.length)
                    body.grid_param = buildGridParam(filters);
                return body;
            },
            description: "Lista clientes por nome (contém), CPF/CNPJ e/ou ativo.",
        }),
        get: op({
            input: { id: { type: "number", description: "ID do cliente" } },
            toBody: (v) => ({ qtype: "cliente.id", query: String(v.id), oper: "=" }),
            description: "Obtém um cliente por id.",
        }),
    },
});
