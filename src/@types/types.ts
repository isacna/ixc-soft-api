interface Config {
    url: string,
    auth: string
}

interface Result {
    registros: string[],
    total: number,
}

type FilterOperator = '=' | '>=' | '>' | '<=' | '<' | 'L' | '!='
type SortOrder = 'asc' | 'desc'

export type IxcRequestOperation = 'listar' | 'obter' | 'incluir' | 'alterar' | 'deletar';

export interface BodyRaw {
    qtype: string,
    query?: string,
    oper: FilterOperator,
    page?: string,
    rp?: string,
    sortname?: string,
    sortorder?: SortOrder,
}


export interface IXC_Interface {
    url: Config;
    registros: Result[];
    total: Result;
    body: BodyRaw
}

export interface IXC_Auth {
    token?: string;
    username?: string;
    password?: string;
}

/**
 * Interface for the response of the list method
 * @property {string} status - Status of the request. Can be 'success' or 'error'
 * @property {string} message - Error message
 * @property {unknown[]} registros - Array of objects with the filtered data. Changes for every table requested from IXC
 * @property {number} total - Total number of records
 */
export interface IxcListResponse {
    status?: string
    message?: string
    registros?: unknown[]
    total?: number
}

export interface IxcReadResponse {
    status?: string;
    message?: string;
    registro?: unknown;
}

export interface IxcMutationResponse {
    status?: string;
    type?: string;
    message?: string;
    data?: Record<string, unknown>;
}

export interface Return_Auth {
    token: string;
}

type ConditionOperator = 'AND' | 'OR'
export interface FilterParams {
    TB: string
    OP: FilterOperator
    P: string
    C: ConditionOperator
    G: string
}
