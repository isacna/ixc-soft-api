import { IxcMutationResponse, IxcReadResponse, IxcRequestOperation } from "../@types/types.js";
interface RequestOptions {
    url: string;
    token: string;
    table: string;
    operation: IxcRequestOperation;
    body?: unknown;
}
export declare function ixcRequest<T = unknown>({ url, token, table, operation, body, }: RequestOptions): Promise<T>;
export declare function parseMutationResponse(response: unknown): IxcMutationResponse;
export declare function parseReadResponse(response: unknown): IxcReadResponse;
export {};
