export interface IInfoMessage<T = any> {
    err?: Error | null;
    info: T;
}
export interface IOptionMessage {
    err?: Error | null;
    success: boolean;
}
