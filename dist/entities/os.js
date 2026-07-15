import { defineEntity, op } from "../core/entity.js";
import { buildGridParam } from "../core/filters.js";
/** Ordem de serviço / chamado. Subconjunto útil das 64 colunas de `su_oss_chamado`. */
const osRecord = {
    id: { type: "string", description: "ID da OS/chamado" },
    id_cliente: { type: "string", optional: true },
    id_filial: { type: "string", optional: true },
    tipo: { type: "string", optional: true },
    status: { type: "string", optional: true, description: "Status do chamado (ex.: A=aberto)" },
    id_assunto: { type: "string", optional: true },
    setor: { type: "string", optional: true },
    id_tecnico: { type: "string", optional: true },
    prioridade: { type: "string", optional: true },
    protocolo: { type: "string", optional: true },
    mensagem: { type: "string", optional: true },
    data_abertura: { type: "string", optional: true },
    data_agenda: { type: "string", optional: true },
    data_final: { type: "string", optional: true },
    data_fechamento: { type: "string", optional: true },
    endereco: { type: "string", optional: true },
    bairro: { type: "string", optional: true },
    complemento: { type: "string", optional: true },
    id_cidade: { type: "string", optional: true },
    origem_os_aberta: { type: "string", optional: true },
};
export const osEntity = defineEntity({
    name: "os",
    table: "su_oss_chamado",
    description: "Ordens de serviço / chamados.",
    record: osRecord,
    ops: {
        list: op({
            input: {
                idCliente: { type: "number", optional: true, description: "Filtra por cliente" },
                status: { type: "string", optional: true, description: "Filtra por status" },
                rp: { type: "number", optional: true },
            },
            toBody: (v) => {
                const filters = [];
                if (v.idCliente)
                    filters.push({ field: "su_oss_chamado.id_cliente", value: v.idCliente });
                if (v.status)
                    filters.push({ field: "su_oss_chamado.status", value: v.status });
                const body = { rp: String(v.rp ?? 100) };
                if (filters.length)
                    body.grid_param = buildGridParam(filters);
                return body;
            },
            description: "Lista ordens de serviço (su_oss_chamado), por cliente e/ou status.",
        }),
        get: op({
            input: { id: { type: "number", description: "ID da OS" } },
            toBody: (v) => ({ qtype: "su_oss_chamado.id", query: String(v.id), oper: "=" }),
            description: "Obtém uma ordem de serviço por id.",
        }),
    },
});
