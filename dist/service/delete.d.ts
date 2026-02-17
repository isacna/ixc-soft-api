import { IxcMutationResponse } from "../@types/types.js";
export declare function deleteRecord(url: string, token: string, table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
