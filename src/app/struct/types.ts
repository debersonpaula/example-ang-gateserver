export class TRouteData {
    caption: string;
    href: string;
    comp: any;
    hideMenu: boolean;
}
export interface TError {
    status: number;
    error: string;
    message: string;
}
export interface TUserLogin {
    userlogin: string;
    userpass: string;
}
export interface TUser {
    userlogin: string;
    userpass: string;
    firstname: string;
    lastname: string;
}
export interface TToken {
    id: number;
    token: {
        expires: number,
        tokenId: string,
    }
}
export interface TSession {
    userData?: TUser;
    tokenData?: TToken;
}
export interface TServerResponse {
    status: number;
    data?: any;
}
export type THttpHandler = (res: TServerResponse, error?: TError) => void;

export interface TNote {
    id: number;
    subject: string;
    message: string;
}