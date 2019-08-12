export default interface Controller {
    findAll: (req: any, res: any) => Promise<any>;
    findOne: (req: any, res: any) => Promise<any>;
    create: (req: any, res: any) => Promise<any>;
    update: (req: any, res: any) => Promise<any>;
    delete: (req: any, res: any) => Promise<any>;
}