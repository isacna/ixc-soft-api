import { boletoEntity } from "./boleto.js";
import { clienteEntity } from "./cliente.js";
import { contratoEntity } from "./contrato.js";
import { osEntity } from "./os.js";
import { loginEntity } from "./login.js";
import { filialEntity } from "./filial.js";
/**
 * Registry of all entities. Add an entity by declaring it in its own file and
 * adding one line here — the typed namespace on `IXC` follows automatically.
 */
export const registry = {
    boleto: boletoEntity,
    cliente: clienteEntity,
    contrato: contratoEntity,
    os: osEntity,
    login: loginEntity,
    filial: filialEntity,
};
