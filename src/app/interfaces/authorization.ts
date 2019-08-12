export default interface Authorization {
    verifyToken: (req: any, res: any, next: any) => Promise<any>;
}