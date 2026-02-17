export const auth = (credentials) => {
    if (credentials.username && credentials.password) {
        const encoded = Buffer.from(`${credentials.username}:${credentials.password}`).toString("base64");
        return { token: `Basic ${encoded}` };
    }
    if (credentials.token) {
        return { token: credentials.token };
    }
    return { token: "" };
};
