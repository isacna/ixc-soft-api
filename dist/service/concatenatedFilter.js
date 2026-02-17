import { ixcRequest } from "./request.js";
export async function concatenatedFilter(url, token, table, filter) {
    const body = {
        rp: "100000",
        grid_param: JSON.stringify(filter),
    };
    const response = await ixcRequest({
        url,
        token,
        table,
        operation: "listar",
        body,
    });
    if (Array.isArray(response.registros) && response.registros.length > 0) {
        return {
            status: "success",
            total: Number(response.total || 0),
            registros: response.registros,
        };
    }
    if (Number(response.total || 0) === 0) {
        return {
            status: "error",
            total: 0,
            registros: [],
        };
    }
    throw new Error(`Unrecognized response from IXC: ${JSON.stringify(response)}`);
}
