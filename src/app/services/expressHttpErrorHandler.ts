
import * as httpStatus from 'http-status';
import { injectable } from 'inversify';
import { HttpErrorHandler } from '../interfaces';

@injectable()
export default class ExpressHttpErrorHandler implements HttpErrorHandler{
	
    public notFound(req: any, res: any): void {
        res.status(httpStatus.NOT_FOUND);
        res.json({
            success: false,
            message: 'Resource Not Found'
        });
        res.end();
    }	
	
    public internalServerError(err: any, req: any, res: any): void {
        res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
        res.json({
            message: err.message,
            extra: err.extra,
            errors: err
        });
        res.end();
    }
}