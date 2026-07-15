export declare const loginEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID do login";
    };
    readonly id_cliente: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_contrato: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly login: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly ativo: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "S/N";
    };
    readonly online: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "S/N — conectado agora";
    };
    readonly ip: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly mac: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly tipo_conexao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly conexao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_concentrador: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly concentrador: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly ultima_conexao_inicial: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly ultima_conexao_final: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly tempo_conectado: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly franquia_consumo: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Consumo download";
    };
    readonly franquia_consumo_up: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Consumo upload";
    };
    readonly download_atual: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly upload_atual: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_filial: {
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
    readonly cidade: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cep: {
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
        readonly online: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "S/N — só conectados/desconectados";
        };
        readonly ativo: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "S/N";
        };
        readonly rp: {
            readonly type: "number";
            readonly optional: true;
        };
    }>;
    readonly get: import("../core/entity.js").OpConfig<{
        readonly id: {
            readonly type: "number";
            readonly description: "ID do login";
        };
    }>;
}, {}>;
