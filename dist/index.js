import { auth } from "./service/auth.js";
import { concatenatedFilter } from "./service/concatenatedFilter.js";
import { createRecord } from "./service/create.js";
import { deleteRecord } from "./service/delete.js";
import { listAll } from "./service/list.js";
import { readRecord } from "./service/read.js";
import { updateRecord } from "./service/update.js";
class IXC {
    constructor({ url, credentials }) {
        this.url = url;
        this.authenticate = auth(credentials);
    }
    async list(table, body) {
        return await listAll(this.url, this.authenticate.token, table, body);
    }
    async listFilter(table, filter) {
        return await concatenatedFilter(this.url, this.authenticate.token, table, filter);
    }
    async read(table, body) {
        return await readRecord(this.url, this.authenticate.token, table, body);
    }
    async create(table, body) {
        return await createRecord(this.url, this.authenticate.token, table, body);
    }
    async update(table, body) {
        return await updateRecord(this.url, this.authenticate.token, table, body);
    }
    async delete(table, body) {
        return await deleteRecord(this.url, this.authenticate.token, table, body);
    }
}
export default IXC;
