import { Container } from 'inversify';
import * as mongoose from 'mongoose';
import { TYPES } from './types';
import Config from './config';
import {
    Validator,
    LoggerConfig,
    Logger,
    AppServer,
    AppServerConfig,
    DatabaseConfig,
    Database,
    HttpErrorHandler,
    PasswordHandler,
    PasswordHandlerConfig,
    RepositoryModel,
    Controller,
    Route,
    Parser,
    ApiDocConfig,
    AccessTokenConfig,
    AccessToken,
    Authorization
} from './interfaces'
import { AjvValidator, Winston, ExpressServer, ExpressHttpErrorHandler, BcryptPasswordHandler, JsonParser, JwtToken, JwtAuthorization } from './services';
import { MongoDb } from './persistence';
import { UserMongoModel } from './repositoryModels';
import { UserController } from './controllers';
import { UserRoutes } from './routes';

const container = new Container();
const { currentConfig } = new Config(process.env.NODE_ENV);
/* ============================   GENERAL IoC DEFINITIONS   ============================ */
container.bind<LoggerConfig>(TYPES.loggerConfig).toConstantValue(currentConfig.loggerConfig);
container.bind<Logger>(TYPES.logger).to(Winston);
container.bind<Validator>(TYPES.validator).to(AjvValidator);
container.bind<AppServerConfig>(TYPES.appServerConfig).toConstantValue(currentConfig.appServerConfig);
container.bind<AppServer>(TYPES.appServer).to(ExpressServer);
container.bind<DatabaseConfig>(TYPES.databaseConfig).toConstantValue(currentConfig.databaseConfig);
container.bind<Database>(TYPES.database).to(MongoDb);
container.bind<HttpErrorHandler>(TYPES.httpErrorHandler).to(ExpressHttpErrorHandler);
container.bind<PasswordHandlerConfig>(TYPES.passwordHandlerConfig).toConstantValue(currentConfig.passwordHandlerConfig);
container.bind<PasswordHandler>(TYPES.passwordHandler).to(BcryptPasswordHandler);
container.bind<Parser<any, string>>(TYPES.jsonParser).to(JsonParser);
container.bind<ApiDocConfig>(TYPES.apiDocConfig).toConstantValue(currentConfig.apiDocConfig);
container.bind<AccessTokenConfig>(TYPES.accessTokenConfig).toConstantValue(currentConfig.accessTokenConfig);
container.bind<AccessToken>(TYPES.accessToken).to(JwtToken);
container.bind<Authorization>(TYPES.authorization).to(JwtAuthorization);
/* ============================   GENERAL IoC DEFINITIONS   ============================ */

/* ============================   MODELS IoC DEFINITIONS   ============================ */
container.bind<RepositoryModel<mongoose.Schema>>(TYPES.userRepositoryModel).to(UserMongoModel);
container.bind<Controller>(TYPES.userController).to(UserController);
container.bind<Route>(TYPES.userRoutes).to(UserRoutes);
/* ============================   MODELS IoC DEFINITIONS   ============================ */

export { container };