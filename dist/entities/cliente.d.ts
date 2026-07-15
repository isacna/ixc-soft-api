export declare const clienteEntity: import("../core/entity.js").EntityDef<{
    readonly id: {
        readonly type: "string";
        readonly description: "ID do cliente";
    };
    readonly razao: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "Razão social / nome";
    };
    readonly fantasia: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cnpj_cpf: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly tipo_pessoa: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "F=física, J=jurídica";
    };
    readonly ativo: {
        readonly type: "string";
        readonly optional: true;
        readonly description: "S/N";
    };
    readonly email: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly fone: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly telefone_celular: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly whatsapp: {
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
    readonly uf: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly cep: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly data_cadastro: {
        readonly type: "string";
        readonly optional: true;
    };
    readonly id_vendedor: {
        readonly type: "string";
        readonly optional: true;
    };
}, {
    readonly list: import("../core/entity.js").OpConfig<{
        readonly razao: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "Contém no nome/razão";
        };
        readonly cnpjCpf: {
            readonly type: "string";
            readonly optional: true;
            readonly description: "CPF/CNPJ exato";
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
            readonly description: "ID do cliente";
        };
    }>;
}, {}>;
