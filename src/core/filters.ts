/** Full IXC comparison operator set (confirmed against the ixc-mcp client). */
export type IxcOperator =
  | "="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "L" // contém
  | "NL" // não contém
  | "IN"
  | "NI"
  | "BE" // entre
  | "NBE";

export interface GridFilter {
  /** `tabela.coluna`, ex.: "fn_areceber.id_cliente" */
  field: string;
  value: string | number;
  operator?: IxcOperator;
  connector?: "AND" | "OR";
}

/** Serializes composite filters into IXC's `grid_param` JSON string. */
export function buildGridParam(filters: GridFilter[]): string {
  return JSON.stringify(
    filters.map((f) => ({
      TB: f.field,
      OP: f.operator ?? "=",
      P: String(f.value),
      C: f.connector ?? "AND",
      G: f.field,
    }))
  );
}
