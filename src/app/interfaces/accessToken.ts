export default interface AccessToken {
    verify: (token: any) => any;
    readAccessToken: (req: any) => string;
    sign: (data: any) => any;
}