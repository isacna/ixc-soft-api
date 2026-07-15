# API IXC Soft

SDK em TypeScript para consumir o WebService do IXC Soft. Oferece uma **API de
domínio tipada e descobrível** (`ixc.boleto.getPdf(...)`, `ixc.cliente.get(...)`) por
cima da API genérica de tabelas — sem dependências de runtime além do `node-fetch`.

## Instalação

```bash
npm install api-ixc-soft
```

## Configuração

```ts
import IXC from "api-ixc-soft";

export const ixc = new IXC({
  url: "https://HOST.com.br", // sem /webservice/v1 no final
  credentials: { token: "Basic ******" },
  // ou
  // credentials: { username: "123", password: "41837b8eb82f1e60e148823a..." }
});
```

Com `username`/`password`, o SDK monta o header `Basic` automaticamente.

---

## API de domínio (tipada)

Cada entidade é um namespace tipado. As entradas usam nomes amigáveis (camelCase) e
são validadas em runtime; as saídas são tipadas mas toleram colunas não declaradas.

### `boleto` — títulos a receber (`fn_areceber`) + 2ª via

```ts
// Lista títulos (por padrão, só liberados e em aberto)
const { total, registros } = await ixc.boleto.list({
  idCliente: 24353,   // ou idContrato
  onlyOpen: true,     // padrão true; false traz todos
  rp: 50,
});

// Um título por id
const titulo = await ixc.boleto.get({ id: 4445567 });

// 2ª via (endpoint de ação get_boleto) → PDF base64 e/ou URL
const { pdfBase64, pdfUrl } = await ixc.boleto.getPdf({
  id: "4445567",      // aceita múltiplos separados por vírgula
  base64: true,       // padrão true
  juros: false,
  multa: false,
});
```

### `cliente`

```ts
// Busca por nome (contém), CPF/CNPJ e/ou ativo
const { registros } = await ixc.cliente.list({ razao: "MARIA", ativo: "S", rp: 20 });

const cliente = await ixc.cliente.get({ id: 24353 });
```

### `contrato` — contratos do cliente (`cliente_contrato`)

```ts
const { registros } = await ixc.contrato.list({ idCliente: 24353, status: "A" });

const contrato = await ixc.contrato.get({ id: 91188 });
```

### `os` — ordens de serviço / chamados (`su_oss_chamado`)

```ts
const { registros } = await ixc.os.list({ idCliente: 24353 });

const chamado = await ixc.os.get({ id: 1049577 });
```

### `login` — logins de acesso radius/PPPoE (`radusuarios`)

```ts
// Por cliente/contrato, online e/ou ativo
const { registros } = await ixc.login.list({ idCliente: 24353, online: "S" });

const login = await ixc.login.get({ id: 81307 });
```

### `filial` — filiais (`filial`)

```ts
const { registros } = await ixc.filial.list({ ativo: "S" });

const filial = await ixc.filial.get({ id: 9 });
```

**Formato das respostas**

- `list` → `{ status?: string; total?: number; registros: T[] }`
- `get` → `T | null`
- `boleto.getPdf` → `{ pdfBase64?: string; pdfUrl?: string }`

---

## API genérica (baixo nível)

Continua disponível para qualquer tabela/operação que ainda não tenha um namespace.
O verbo HTTP é sempre POST; a operação é escolhida pelo header `ixcsoft`.

### `list(table, body)` — `ixcsoft: listar`

```ts
const result = await ixc.list("cliente", {
  qtype: "cliente.id", // formato tabela.coluna
  query: "24353",
  oper: "=",
  page: "1",
  rp: "20",
});
```

### `listFilter(table, filter)` — filtros compostos (`grid_param`)

```ts
const result = await ixc.listFilter("su_oss_chamado", [
  { TB: "su_oss_chamado.status", OP: "=", P: "F", C: "AND", G: "status" },
  { TB: "su_oss_chamado.setor", OP: "=", P: "1", C: "AND", G: "setor" },
]);
```

Operadores suportados pelo IXC: `= != > < >= <= L NL IN NI BE NBE`
(`L` = contém, `BE` = entre).

### `read(table, body)` · `create` · `update` · `delete`

```ts
await ixc.read("cliente", { id: "123" });                 // ixcsoft: obter
await ixc.create("cliente", { razao: "Teste", tipo_pessoa: "F" }); // incluir
await ixc.update("cliente", { id: "123", razao: "Novo" }); // alterar
await ixc.delete("cliente", { id: "123" });                // deletar
```

---

## Metadados (pronto para MCP)

Cada namespace expõe `__meta` com o JSON Schema de cada operação já pronto — a base
para gerar ferramentas de um servidor MCP ou documentação, sem dependência extra.

```ts
ixc.boleto.__meta.operations;
// [{ name: "list", kind: "crud", ixcsoft: "listar", inputSchema: {...} },
//  { name: "get",  kind: "crud", ... },
//  { name: "getPdf", kind: "action", inputSchema: {...} }]
```

## Estendendo o SDK

Adicionar uma entidade = um arquivo em `src/entities/` + uma linha no `registry`
(`src/entities/index.ts`). O namespace tipado em `ixc.<nome>` aparece automaticamente.

```ts
import { defineEntity, op, action } from "api-ixc-soft";

export const contratoEntity = defineEntity({
  name: "contrato",
  table: "cliente_contrato",
  record: { id: { type: "string" }, status: { type: "string", optional: true } },
  ops: {
    list: op({
      input: { idCliente: { type: "number", optional: true } },
      toBody: (v) => ({ qtype: "cliente_contrato.id_cliente", query: String(v.idCliente), oper: "=" }),
    }),
  },
});
```

Uma única declaração de campos (`record`/`input`) gera o tipo TypeScript, a validação
em runtime e o JSON Schema.

## Observação

Os endpoints/tabelas e payloads seguem a documentação oficial do IXC Soft:
https://wikiapiprovedor.ixcsoft.com.br/#
