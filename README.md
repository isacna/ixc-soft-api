# API IXC Soft

Este módulo permite que você faz consultas no seu ERP de forma automática, passando apenas alguns parametros de forma simples.

## Uso

Instalar pacote usando NPM

```bash
npm install api-ixc-soft
```

Instancie a class e exporte.

```javascript
import IXC from "api-ixc-soft"

export const ixc = new IXC({
    url: `https://HOST.com.br`,
    credentials: {token: `Basic ******`} or {username: "123", password: "41837b8eb82f1e60e148823a..."}
    })
```

Exemplo request:

```javascript

const row = async () => {
    const result = await ixc.list("cliente", {
        qtype: "id",
        query: "123",
        oper: "=",
        page: "1",
    });
    return result;
};
row().then((item) => console.log(item));
```