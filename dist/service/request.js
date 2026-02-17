import fetch from "node-fetch";
export async function ixcRequest({ url, token, table, operation, body = {}, }) {
    const response = await fetch(`${url}/webservice/v1/${table}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            ixcsoft: operation,
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error(`IXC request failed with status ${response.status}`);
    }
    return (await response.json());
}
export function parseMutationResponse(response) {
    const typed = response;
    return {
        status: typeof typed.status === "string" ? typed.status : undefined,
        type: typeof typed.type === "string" ? typed.type : undefined,
        message: typeof typed.message === "string"
            ? typed.message
            : typeof typed.mensagem === "string"
                ? typed.mensagem
                : undefined,
        data: typed,
    };
}
export function parseReadResponse(response) {
    const typed = response;
    return {
        status: typeof typed.status === "string" ? typed.status : undefined,
        message: typeof typed.message === "string"
            ? typed.message
            : typeof typed.mensagem === "string"
                ? typed.mensagem
                : undefined,
        registro: typed.registro ?? typed,
    };
}
