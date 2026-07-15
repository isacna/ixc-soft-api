import { defineEntity, op } from "../core/entity";
import { buildGridParam, GridFilter } from "../core/filters";

/** Contrato do cliente. Subconjunto útil das 147 colunas de `cliente_contrato`. */
const contratoRecord = {
  id: { type: "string", description: "ID do contrato" },
  id_cliente: { type: "string", optional: true },
  id_filial: { type: "string", optional: true },
  status: { type: "string", optional: true, description: "Status do contrato (ex.: A=ativo)" },
  status_internet: { type: "string", optional: true },
  contrato: { type: "string", optional: true, description: "Número/descrição do contrato" },
  id_tipo_contrato: { type: "string", optional: true },
  id_vendedor: { type: "string", optional: true },
  data: { type: "string", optional: true, description: "Data do contrato" },
  data_ativacao: { type: "string", optional: true },
  data_cancelamento: { type: "string", optional: true },
  data_renovacao: { type: "string", optional: true },
  data_expiracao: { type: "string", optional: true },
  endereco: { type: "string", optional: true },
  numero: { type: "string", optional: true },
  bairro: { type: "string", optional: true },
  cidade: { type: "string", optional: true },
  cep: { type: "string", optional: true },
  complemento: { type: "string", optional: true },
  aviso_atraso: { type: "string", optional: true },
  bloqueio_automatico: { type: "string", optional: true },
  renovacao_automatica: { type: "string", optional: true },
  fidelidade: { type: "string", optional: true },
} as const;

export const contratoEntity = defineEntity({
  name: "contrato",
  table: "cliente_contrato",
  description: "Contratos do cliente.",
  record: contratoRecord,
  ops: {
    list: op({
      input: {
        idCliente: { type: "number", optional: true, description: "Filtra por cliente" },
        status: { type: "string", optional: true, description: "Filtra por status" },
        rp: { type: "number", optional: true },
      },
      toBody: (v) => {
        const filters: GridFilter[] = [];
        if (v.idCliente) filters.push({ field: "cliente_contrato.id_cliente", value: v.idCliente });
        if (v.status) filters.push({ field: "cliente_contrato.status", value: v.status });
        const body: Record<string, unknown> = { rp: String(v.rp ?? 100) };
        if (filters.length) body.grid_param = buildGridParam(filters);
        return body;
      },
      description: "Lista contratos (cliente_contrato), por cliente e/ou status.",
    }),
    get: op({
      input: { id: { type: "number", description: "ID do contrato" } },
      toBody: (v) => ({ qtype: "cliente_contrato.id", query: String(v.id), oper: "=" }),
      description: "Obtém um contrato por id.",
    }),
  },
});
