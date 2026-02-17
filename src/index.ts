import {
  BodyRaw,
  FilterParams,
  IXC_Auth,
  IxcListResponse,
  IxcMutationResponse,
  IxcReadResponse,
  Return_Auth,
} from "./@types/types";
import { auth } from "./service/auth";
import { concatenatedFilter } from "./service/concatenatedFilter";
import { createRecord } from "./service/create";
import { deleteRecord } from "./service/delete";
import { listAll } from "./service/list";
import { readRecord } from "./service/read";
import { updateRecord } from "./service/update";

class IXC {
  public url: string;
  public authenticate: Return_Auth;

  constructor({ url, credentials }: { url: string; credentials: IXC_Auth }) {
    this.url = url;
    this.authenticate = auth(credentials);
  }

  async list(table: string, body: BodyRaw): Promise<IxcListResponse> {
    return await listAll(this.url, this.authenticate.token, table, body);
  }

  async listFilter(table: string, filter: FilterParams[]): Promise<IxcListResponse> {
    return await concatenatedFilter(this.url, this.authenticate.token, table, filter);
  }

  async read(table: string, body: Record<string, unknown>): Promise<IxcReadResponse> {
    return await readRecord(this.url, this.authenticate.token, table, body);
  }

  async create(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await createRecord(this.url, this.authenticate.token, table, body);
  }

  async update(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await updateRecord(this.url, this.authenticate.token, table, body);
  }

  async delete(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse> {
    return await deleteRecord(this.url, this.authenticate.token, table, body);
  }
}

export default IXC;
