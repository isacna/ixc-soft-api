import { IxcMutationResponse } from "../@types/types.js";
export declare function updateRecord(url: string, token: string, table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
