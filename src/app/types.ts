const TYPES = {
    validator: Symbol.for('Validator'),
    loggerConfig: Symbol.for('LoggerConfig'),
    logger: Symbol.for('Logger'),
    appServer: Symbol.for('AppServer'),
    appServerConfig: Symbol.for('AppServerConfig'),
    database: Symbol.for('Database'),
    databaseConfig: Symbol.for('DatabaseConfig'),
    httpErrorHandler: Symbol.for('HttpErrorHandler'),
    passwordHandler: Symbol.for('PasswordHandler'),
    passwordHandlerConfig: Symbol.for('PasswordHandlerConfig'),
    userRepositoryModel: Symbol.for('UserRepositoryModel'),
    userController: Symbol.for('UserController'),
    userRoutes: Symbol.for('UserRoutes'),
    jsonParser: Symbol.for('JsonParser'),
    apiDoc: Symbol.for('ApiDoc'),
    apiDocConfig: Symbol.for('ApiDocConfig'),
    accessToken: Symbol.for('AccessToken'),
    accessTokenConfig: Symbol.for('AccessTokenConfig'),
    authorization: Symbol.for('Authorization')
};

export { TYPES };