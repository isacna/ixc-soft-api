import { BodyRaw, FilterParams, IXC_Auth, IxcListResponse, IxcMutationResponse, IxcReadResponse, Return_Auth } from "./@types/types.js";
declare class IXC {
    url: string;
    authenticate: Return_Auth;
    constructor({ url, credentials }: {
        url: string;
        credentials: IXC_Auth;
    });
    list(table: string, body: BodyRaw): Promise<IxcListResponse>;
    listFilter(table: string, filter: FilterParams[]): Promise<IxcListResponse>;
    read(table: string, body: Record<string, unknown>): Promise<IxcReadResponse>;
    create(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
    update(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
    delete(table: string, body: Record<string, unknown>): Promise<IxcMutationResponse>;
}
export default IXC;
