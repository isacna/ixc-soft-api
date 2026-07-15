import { action, defineEntity, op } from "../core/entity";
import { buildGridParam, GridFilter } from "../core/filters";

/**
 * Boletos / contas a receber. Data lives in `fn_areceber` (listagem/obter);
 * o PDF/2ª via vem do endpoint de ação `get_boleto`.
 *
 * O registro traz um subconjunto útil das 86 colunas de `fn_areceber`; colunas
 * não declaradas continuam acessíveis (parsing permissivo).
 */
const areceberRecord = {
  id: { type: "string", description: "ID do título (fn_areceber)" },
  id_cliente: { type: "string", optional: true, description: "ID do cliente" },
  id_contrato: { type: "string", optional: true, description: "ID do contrato" },
  valor: { type: "string", optional: true, description: "Valor do título" },
  valor_aberto: { type: "string", optional: true },
  valor_recebido: { type: "string", optional: true },
  status: { type: "string", optional: true, description: "A=aberto, R=recebido, C=cancelado" },
  liberado: { type: "string", optional: true, description: "S/N" },
  data_emissao: { type: "string", optional: true },
  data_vencimento: { type: "string", optional: true },
  documento: { type: "string", optional: true },
  nn_boleto: { type: "string", optional: true, description: "Nosso número" },
  linha_digitavel: { type: "string", optional: true },
  gateway_link: { type: "string", optional: true, description: "Link do boleto no gateway" },
  forma_recebimento: { type: "string", optional: true },
  pix_txid: { type: "string", optional: true },
} as const;

export const boletoEntity = defineEntity({
  name: "boleto",
  table: "fn_areceber",
  description: "Boletos / contas a receber (financeiro).",
  record: areceberRecord,
  ops: {
    list: op({
      input: {
        idCliente: { type: "number", optional: true, description: "Filtra por cliente" },
        idContrato: { type: "number", optional: true, description: "Filtra por contrato" },
        onlyOpen: { type: "boolean", optional: true, description: "Somente liberados e em aberto (padrão true)" },
        rp: { type: "number", optional: true, description: "Registros por página" },
      },
      toBody: (v) => {
        const filters: GridFilter[] = [];
        if (v.onlyOpen !== false) {
          filters.push({ field: "fn_areceber.liberado", value: "S" });
          filters.push({ field: "fn_areceber.status", value: "A" });
        }
        if (v.idCliente) filters.push({ field: "fn_areceber.id_cliente", value: v.idCliente });
        if (v.idContrato) filters.push({ field: "fn_areceber.id_contrato", value: v.idContrato });
        const body: Record<string, unknown> = {
          rp: String(v.rp ?? 100000),
          sortname: "fn_areceber.id",
          sortorder: "desc",
        };
        if (filters.length) body.grid_param = buildGridParam(filters);
        return body;
      },
      description: "Lista títulos em fn_areceber, por cliente/contrato (padrão: só em aberto).",
    }),
    get: op({
      input: { id: { type: "number", description: "ID do título" } },
      toBody: (v) => ({ qtype: "fn_areceber.id", query: String(v.id), oper: "=" }),
      description: "Obtém um título a receber por id.",
    }),
  },
  actions: {
    getPdf: action({
      // Payload confirmado pelo cliente do ixc-mcp.
      path: "get_boleto",
      input: {
        id: { type: "string", description: "ID(s) do título em fn_areceber (separe múltiplos por vírgula)" },
        tipoBoleto: { type: "string", optional: true, description: "arquivo (PDF, padrão) ou html" },
        base64: { type: "boolean", optional: true, description: "Retornar o PDF em base64 (padrão true)" },
        juros: { type: "boolean", optional: true, description: "Aplicar juros" },
        multa: { type: "boolean", optional: true, description: "Aplicar multa" },
      },
      toBody: (v) => ({
        boletos: v.id,
        tipo_boleto: v.tipoBoleto ?? "arquivo",
        base64: v.base64 === false ? "N" : "S",
        qjuro: v.juros ? "S" : "N",
        juro: v.juros ? "S" : "N",
        multa: v.multa ? "S" : "N",
        atualiza_boleto: "N",
      }),
      output: {
        pdfBase64: { type: "string", optional: true, description: "PDF em base64" },
        pdfUrl: { type: "string", optional: true, description: "URL do boleto" },
      },
      fromResponse: (raw) => {
        const o = (raw ?? {}) as Record<string, unknown>;
        const pick = (keys: string[]) => {
          for (const k of keys) {
            const val = o[k];
            if (typeof val === "string" && val) return val;
          }
          return undefined;
        };
        return {
          pdfBase64: pick(["base64", "arquivo", "file", "conteudo"]),
          pdfUrl: pick(["link_boleto", "url", "url_boleto", "gateway_link"]),
        };
      },
      description: "Emite a 2ª via do boleto: PDF em base64 e/ou URL.",
    }),
  },
});
