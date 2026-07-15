export declare const boletoEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID do título (fn_areceber)";
    };
    readonly id_cliente: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "ID do cliente";
    };
    readonly id_contrato: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "ID do contrato";
    };
    readonly valor: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Valor do título";
    };
    readonly valor_aberto: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly valor_recebido: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly status: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "A=aberto, R=recebido, C=cancelado";
    };
    readonly liberado: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "S/N";
    };
    readonly data_emissao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_vencimento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly documento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly nn_boleto: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Nosso número";
    };
    readonly linha_digitavel: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly gateway_link: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Link do boleto no gateway";
    };
    readonly forma_recebimento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly pix_txid: {
        readonly type: "string";
        readonly optional: true;
    };
}, {
    readonly list: import("../core/entity.js").OpConfig<{
        readonly idCliente: {
            readonly type: "number";
            readonly optional: true;
            readonly description: "Filtra por cliente";
        };
        readonly idContrato: {
            readonly type: "number";
            readonly optional: true;
            readonly description: "Filtra por contrato";
        };
        readonly onlyOpen: {
            readonly type: "boolean";
            readonly optional: true;
            readonly description: "Somente liberados e em aberto (padrão true)";
        };
        readonly rp: {
            readonly type: "number";
            readonly optional: true;
            readonly description: "Registros por página";
        };
    }>;
    readonly get: import("../core/entity.js").OpConfig<{
        readonly id: {
            readonly type: "number";
            readonly description: "ID do título";
        };
    }>;
}, {
    readonly getPdf: import("../core/entity.js").ActionDef<{
        readonly id: {
            readonly type: "string";
            readonly description: "ID(s) do título em fn_areceber (separe múltiplos por vírgula)";
        };
        readonly tipoBoleto: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "arquivo (PDF, padrão) ou html";
        };
        readonly base64: {
            readonly type: "boolean";
            readonly optional: true;
            readonly description: "Retornar o PDF em base64 (padrão true)";
        };
        readonly juros: {
            readonly type: "boolean";
            readonly optional: true;
            readonly description: "Aplicar juros";
        };
        readonly multa: {
            readonly type: "boolean";
            readonly optional: true;
            readonly description: "Aplicar multa";
        };
    }, {
        readonly pdfBase64: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "PDF em base64";
        };
        readonly pdfUrl: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "URL do boleto";
        };
    }>;
}>;
