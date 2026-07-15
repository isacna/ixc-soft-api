import { defineEntity, op } from "../core/entity";
import { buildGridParam, GridFilter } from "../core/filters";

/**
 * Login / acesso (radius, PPPoE) — tabela `radusuarios`. Subconjunto útil das 114
 * colunas; `senha` fica de fora do descritor de propósito (acessível via passthrough).
 */
const loginRecord = {
  id: { type: "string", description: "ID do login" },
  id_cliente: { type: "string", optional: true },
  id_contrato: { type: "string", optional: true },
  login: { type: "string", optional: true },
  ativo: { type: "string", optional: true, description: "S/N" },
  online: { type: "string", optional: true, description: "S/N — conectado agora" },
  ip: { type: "string", optional: true },
  mac: { type: "string", optional: true },
  tipo_conexao: { type: "string", optional: true },
  conexao: { type: "string", optional: true },
  id_concentrador: { type: "string", optional: true },
  concentrador: { type: "string", optional: true },
  ultima_conexao_inicial: { type: "string", optional: true },
  ultima_conexao_final: { type: "string", optional: true },
  tempo_conectado: { type: "string", optional: true },
  franquia_consumo: { type: "string", optional: true, description: "Consumo download" },
  franquia_consumo_up: { type: "string", optional: true, description: "Consumo upload" },
  download_atual: { type: "string", optional: true },
  upload_atual: { type: "string", optional: true },
  id_filial: { type: "string", optional: true },
  endereco: { type: "string", optional: true },
  bairro: { type: "string", optional: true },
  cidade: { type: "string", optional: true },
  cep: { type: "string", optional: true },
} as const;

export const loginEntity = defineEntity({
  name: "login",
  table: "radusuarios",
  description: "Logins de acesso (radius/PPPoE).",
  record: loginRecord,
  ops: {
    list: op({
      input: {
        idCliente: { type: "number", optional: true, description: "Filtra por cliente" },
        idContrato: { type: "number", optional: true, description: "Filtra por contrato" },
        online: { type: "string", optional: true, description: "S/N — só conectados/desconectados" },
        ativo: { type: "string", optional: true, description: "S/N" },
        rp: { type: "number", optional: true },
      },
      toBody: (v) => {
        const filters: GridFilter[] = [];
        if (v.idCliente) filters.push({ field: "radusuarios.id_cliente", value: v.idCliente });
        if (v.idContrato) filters.push({ field: "radusuarios.id_contrato", value: v.idContrato });
        if (v.online) filters.push({ field: "radusuarios.online", value: v.online });
        if (v.ativo) filters.push({ field: "radusuarios.ativo", value: v.ativo });
        const body: Record<string, unknown> = { rp: String(v.rp ?? 100) };
        if (filters.length) body.grid_param = buildGridParam(filters);
        return body;
      },
      description: "Lista logins (radusuarios), por cliente/contrato, online e/ou ativo.",
    }),
    get: op({
      input: { id: { type: "number", description: "ID do login" } },
      toBody: (v) => ({ qtype: "radusuarios.id", query: String(v.id), oper: "=" }),
      description: "Obtém um login por id.",
    }),
  },
});
