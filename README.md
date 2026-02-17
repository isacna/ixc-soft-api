# API IXC Soft

SDK em TypeScript para consumir o WebService do IXC Soft e facilitar publicação/consumo via NPM.

## Instalação

```bash
npm install api-ixc-soft
```

## Configuração

```ts
import IXC from "api-ixc-soft";

export const ixc = new IXC({
  url: "https://HOST.com.br",
  credentials: { token: "Basic ******" },
  // ou
  // credentials: { username: "123", password: "41837b8eb82f1e60e148823a..." }
});
```

## Métodos disponíveis

### `list(table, body)`

Consulta registros com `ixcsoft: listar`.

```ts
const result = await ixc.list("cliente", {
  qtype: "id",
  query: "123",
  oper: "=",
  page: "1",
  rp: "20",
});
```

### `listFilter(table, filter)`

Consulta com filtros concatenados (`grid_param`).

```ts
const result = await ixc.listFilter("su_oss_chamado", [
  { TB: "status", OP: "=", P: "F", C: "AND", G: "status" },
  { TB: "setor", OP: "=", P: "1", C: "AND", G: "setor" },
]);
```

### `read(table, body)`

Obtém um único registro com `ixcsoft: obter`.

```ts
const result = await ixc.read("cliente", { id: "123" });
```

### `create(table, body)`

Insere registro com `ixcsoft: incluir`.

```ts
const result = await ixc.create("cliente", {
  razao: "Cliente Teste",
  tipo_pessoa: "F",
});
```

### `update(table, body)`

Atualiza registro com `ixcsoft: alterar`.

```ts
const result = await ixc.update("cliente", {
  id: "123",
  razao: "Cliente Atualizado",
});
```

### `delete(table, body)`

Remove registro com `ixcsoft: deletar`.

```ts
const result = await ixc.delete("cliente", { id: "123" });
```

## Observação

Os endpoints/tabelas e payloads dependem da documentação oficial do IXC Soft:
https://wikiapiprovedor.ixcsoft.com.br/#

## Publicação automática no npmjs (GitHub Actions)

Foi adicionado workflow em `.github/workflows/publish-npm.yml`.

### Como configurar

1. No GitHub do repositório, configure o secret:
   - `NPM_TOKEN`: token de automação do npmjs com permissão de publish.
2. Faça commit com versão atualizada no `package.json`.
3. Crie e envie uma tag semântica:

```bash
git tag v1.1.1
git push origin v1.1.1
```

Ao subir a tag `v*.*.*`, o workflow executa `npm ci`, `npm run build` e `npm publish`.
