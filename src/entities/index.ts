import { boletoEntity } from "./boleto";
import { clienteEntity } from "./cliente";
import { contratoEntity } from "./contrato";
import { osEntity } from "./os";
import type { EntityClient } from "../core/entity";

/**
 * Registry of all entities. Add an entity by declaring it in its own file and
 * adding one line here — the typed namespace on `IXC` follows automatically.
 */
export const registry = {
  boleto: boletoEntity,
  cliente: clienteEntity,
  contrato: contratoEntity,
  os: osEntity,
} as const;

export type Registry = typeof registry;

/** Maps the registry to the typed namespaces merged onto the `IXC` class. */
export type Namespaces = {
  [K in keyof Registry]: EntityClient<Registry[K]>;
};
