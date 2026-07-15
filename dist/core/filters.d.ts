/** Full IXC comparison operator set (confirmed against the ixc-mcp client). */
export type IxcOperator = "=" | "!=" | ">" | "<" | ">=" | "<=" | "L" | "NL" | "IN" | "NI" | "BE" | "NBE";
export interface GridFilter {
    /** `tabela.coluna`, ex.: "fn_areceber.id_cliente" */
    field: string;
    value: string | number;
    operator?: IxcOperator;
    connector?: "AND" | "OR";
}
/** Serializes composite filters into IXC's `grid_param` JSON string. */
export declare function buildGridParam(filters: GridFilter[]): string;
