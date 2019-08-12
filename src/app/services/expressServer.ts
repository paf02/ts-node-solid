import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { injectable, inject } from 'inversify';
import { AppServer, Logger, AppServerConfig, HttpErrorHandler, Route, ApiDocConfig } from './../interfaces/';
import { TYPES } from '../types';

@injectable()
export default class ExpressServer implements AppServer{
    private express: express.Application;
    private config: AppServerConfig;
    private logger: Logger;
    private httpErrorHandler: HttpErrorHandler;
    private userRoutes: Route;
    private apiDocConfig: ApiDocConfig;

    public constructor(@inject(TYPES.logger) logger: Logger,
		@inject(TYPES.appServerConfig) config: AppServerConfig,
		@inject(TYPES.httpErrorHandler) httpError: HttpErrorHandler,
		@inject(TYPES.userRoutes) userRoutes: Route,
		@inject(TYPES.apiDocConfig) apiDocConfig: ApiDocConfig) {
        this.config = config;
        this.logger = logger;
        this.httpErrorHandler = httpError;
        this.userRoutes = userRoutes;
        this.apiDocConfig = apiDocConfig;
    }
	
    public get Server(): any {
        return express;
    }

    public initServer(): void {
        this.express = express();
        this.setMiddlewares();
        this.setRoutes();
        this.setErrorsHandlers();
        this.express.listen(this.config.port)
        this.logger.Info(`Listen on port: ${this.config.port}!`)
        this.logger.Info(`Environment: ${process.env.NODE_ENV}!`)
    }

    private setMiddlewares(): void {
        this.express.use(cors());
        this.express.use(morgan(process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'test' ? 'tiny' : 'dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    private setErrorsHandlers(): void {
        this.express.use(this.httpErrorHandler.notFound);
    	this.express.use(this.httpErrorHandler.internalServerError);
    }
	
    private setRoutes(): void{
        const swaggerDocument = yaml.load(this.apiDocConfig.document);
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, this.apiDocConfig.options));
        this.express.use('/api', this.userRoutes.getRoutes());
    }
}