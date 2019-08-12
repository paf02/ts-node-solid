export default interface PasswordHandler{
    encrypt: (value: string) => string;
    compare: (value: string, hash: string) => boolean;
}