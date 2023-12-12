interface Config {
    url: String;
    auth: String;
}
interface Result {
    registros: String[];
    total: Number;
}
type FilterOperator = '=' | '>=' | '>' | '<=' | '<' | 'L' | '!=';
type SortOrder = 'asc' | 'desc';
export interface BodyRaw {
    qtype: string;
    query?: string;
    oper: FilterOperator;
    page?: string;
    rp?: string;
    sortname?: string;
    sortorder?: SortOrder;
}
export interface IXC_Interface {
    url: Config;
    registros: Result[];
    total: Result;
    body: BodyRaw;
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
    status?: string;
    message?: string;
    registros?: unknown[];
    total?: number;
}
export interface Return_Auth {
    token: string;
}
type ConditionOperator = 'AND' | 'OR';
export interface FilterParams {
    TB: string;
    OP: FilterOperator;
    P: string;
    C: ConditionOperator;
    G: string;
}
export {};
