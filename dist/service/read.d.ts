import { IxcReadResponse } from "../@types/types.js";
export declare function readRecord(url: string, token: string, table: string, body: Record<string, unknown>): Promise<IxcReadResponse>;
