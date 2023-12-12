import { BodyRaw, IxcListResponse } from "../@types/types.js";
export declare function listAll(url: string, token: string, table: string, body: BodyRaw): Promise<IxcListResponse>;
