export declare const osEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID da OS/chamado";
    };
    readonly id_cliente: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_filial: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly tipo: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly status: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Status do chamado (ex.: A=aberto)";
    };
    readonly id_assunto: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly setor: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_tecnico: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly prioridade: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly protocolo: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly mensagem: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_abertura: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_agenda: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_final: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_fechamento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly endereco: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly bairro: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly complemento: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_cidade: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly origem_os_aberta: {
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
            readonly description: "ID da OS";
        };
    }>;
}, {}>;
