// import fetch from "node-fetch"
import { auth } from "./service/auth.js";
import { concatenatedFilter } from "./service/concatenatedFilter.js";
import { listAll } from "./service/list.js";
/**
 * The `IXC` module provides a set of functions for list, update, create and delete
 *
 * @param url URL of the IXC API
 * @param credentials {@link IXC_Auth} Object with the credentials to be used in the requests
 * ```json
 * {
 *  "username": "25",
 *  "password": "41837b8eb82f1e60e148823a..."
 * }
 * ```
 * OR
 *  ```json
 * {
 *  "token": "Basic MTYzOjk3NmRmZjlkNGZkNjExODdhNzUyNWQ..."
 * }
 * ```
 *
 * @example
 * ```js
 * const ixc = new IXC({
 *  url: "https://assinante.nome.com.br",
 *  credentials: {token: "Basic ...."} OR {username: "25", password: "418732...."}
 * })
 * ```
 */
class IXC {
    constructor({ url, credentials }) {
        this.url = url;
        this.authenticate = auth(credentials);
    }
    /**
   * The `IXC` module provides a set of functions for list, update, create and delete
   * @see [source](https://wikiapiprovedor.ixcsoft.com.br/#)
   */
    /**
       *
       * @param table {@link [tables](https://wikiapiprovedor.ixcsoft.com.br/#)} Path to the table to be queried
       * @param body {@link BodyRaw} Object with the parameters to be sent to the API. Example:
       * ```json
       * {
       *  "qtype": "id",
       *  "query": "1",
       *  "oper": "=",
       *  "page": "1",
       *  "rp": "10",
       *  "sortname": "id",
       *  "sortorder": "asc",
       * }
       * ```
       * @returns {@link IxcListResponse}
       */
    async list(table, body) {
        return await listAll(this.url, this.authenticate.token, table, body);
    }
    ;
    /**
       *
       * @param table {@link [tables](https://wikiapiprovedor.ixcsoft.com.br/#)} Path to the table to be queried
       * @param filter {@link FilterParams} Array of objects with the parameters to be sent to the API. Example:
       * ```json
       * [
       *  {
       *      "TB": "setor",
       *      "OP": "=",
       *      "P": "1",
       *      "C": "AND",
       *      "G": "setor",
       *  },
       *  {
       *      "TB": "status",
       *      "OP": "=",
       *      "P": "F",
       *      "C": "AND",
       *      "G": "status",
       *  }
       *  {
       *      "TB": "data_abertura",
       *      "OP": ">=",
       *      "P": "2023-12-01",
       *      "C": "AND",
       *      "G": "data_abertura",
       *  }
       * ]
       * ```
       * @returns {@link IxcListResponse}
       */
    async listFilter(table, filter) {
        return await concatenatedFilter(this.url, this.authenticate.token, table, filter);
    }
}
export default IXC;
