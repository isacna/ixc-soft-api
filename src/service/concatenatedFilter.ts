import fetch from "node-fetch";
import { FilterParams, IxcListResponse } from "../@types/types";

export async function concatenatedFilter(url: string, token: string, table: string, filter: FilterParams[]): Promise<IxcListResponse> {

    const body = {
        rp: "100000",
        grid_param: JSON.stringify(filter),
    }

    const ixcRequest = await fetch(`${url}/webservice/v1/${table}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            ixcsoft: "listar",
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    if (ixcRequest.ok === false) {
        throw Error(`Network response was not ok`);
    }

    const response = await ixcRequest.json()
    if (response.registros && response.registros.length > 0) {
        return {
            status: "success",
            total: response.total,
            registros: response.registros
        };
    }
    if (response.total == 0) {
        return {
            status: "error",
            total: 0,
            registros: []
        };
    }
    throw Error(`Unrecognized response from IXC: ${JSON.stringify(response)}`);
}