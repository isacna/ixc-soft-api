import { IXC_Auth, Return_Auth } from "../@types/types";

export const auth = (auth: IXC_Auth): Return_Auth => {
    if(auth.username && auth.password) auth.token = Buffer.from(`Basic ${auth.username}:${auth.password}`).toString("base64");
    if(auth.token) auth.token
    return {token: auth.token || ""}
}