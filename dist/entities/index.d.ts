import type { EntityClient } from "../core/entity.js";
/**
 * Registry of all entities. Add an entity by declaring it in its own file and
 * adding one line here — the typed namespace on `IXC` follows automatically.
 */
export declare const registry: {
    readonly boleto: import("../core/entity.js").EntityDef<{
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
    readonly cliente: import("../core/entity.js").EntityDef<{
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
            /** Maps the registry to the typed namespaces merged onto the `IXC` class. */
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
    readonly contrato: import("../core/entity.js").EntityDef<{
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
    readonly os: import("../core/entity.js").EntityDef<{
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
};
export type Registry = typeof registry;
/** Maps the registry to the typed namespaces merged onto the `IXC` class. */
export type Namespaces = {
    [K in keyof Registry]: EntityClient<Registry[K]>;
};
