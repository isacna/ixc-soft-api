export interface ListResult<T = Record<string, unknown>> {
    status?: string;
    total?: number;
    registros: T[];
}
export interface MutationResult {
    status?: string;
    type?: string;
    message?: string;
    id?: string;
    [key: string]: unknown;
}
export declare function parseMutationResponse(response: unknown): {
    status?: string;
    type?: string;
    message?: string;
    data?: Record<string, unknown>;
};
export declare function parseReadResponse(response: unknown): {
    status?: string;
    message?: string;
    registro?: unknown;
};
export declare function normalizeList<T = Record<string, unknown>>(raw: unknown): ListResult<T>;
export declare function normalizeMutation(raw: unknown): MutationResult;
