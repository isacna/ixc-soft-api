export declare const contratoEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID do contrato";
    };
    readonly id_cliente: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_filial: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly status: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Status do contrato (ex.: A=ativo)";
    };
    readonly status_internet: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly contrato: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Número/descrição do contrato";
    };
    readonly id_tipo_contrato: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_vendedor: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Data do contrato";
    };
    readonly data_ativacao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_cancelamento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_renovacao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_expiracao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly endereco: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly numero: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly bairro: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cidade: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cep: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly complemento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly aviso_atraso: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly bloqueio_automatico: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly renovacao_automatica: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly fidelidade: {
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
        readonly status: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "Filtra por status";
        };
        readonly rp: {
            readonly type: "number";
            readonly optional: true;
        };
    }>;
    readonly get: import("../core/entity.js").OpConfig<{
        readonly id: {
            readonly type: "number";
            readonly description: "ID do contrato";
        };
    }>;
}, {}>;
