export const auth = (auth) => {
    if (auth.username && auth.password)
        auth.token = Buffer.from(`Basic ${auth.username}:${auth.password}`).toString("base64");
    if (auth.token)
        auth.token;
    return { token: auth.token || "" };
};
