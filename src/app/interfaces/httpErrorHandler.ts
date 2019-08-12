export default interface HttpErrorHandler{
    notFound: (req: any, res: any, next: () => void) => void;
    internalServerError: (err: any, req: any, res: any, next: () => void) => void;
}