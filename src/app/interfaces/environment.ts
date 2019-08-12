import { LoggerConfig, AppServerConfig, DatabaseConfig, PasswordHandlerConfig, ApiDocConfig, AccessTokenConfig } from './';

export default interface Environment {
    loggerConfig: LoggerConfig;
    appServerConfig: AppServerConfig;
    databaseConfig: DatabaseConfig;
    passwordHandlerConfig: PasswordHandlerConfig;
    apiDocConfig: ApiDocConfig;
    accessTokenConfig: AccessTokenConfig;
}
