export declare const filialEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID da filial";
    };
    readonly ativo: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "S/N";
    };
    readonly id_empresa: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly razao: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly fantasia: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cnpj: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly ie: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly im: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly tipo_pessoa: {
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
    readonly telefone: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly email: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly site: {
        readonly type: "string";
        readonly optional: true;
    };
}, {
    readonly list: import("../core/entity.js").OpConfig<{
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
            readonly description: "ID da filial";
        };
    }>;
}, {}>;
