import { container } from './inversify.config';
import { TYPES } from './types';
import {
    AppServer,
    Logger,
    Database,
} from './interfaces';

export default class DependencyResolver {
    private _logger: Logger;
    private _appServer: AppServer;
    private _database: Database;

    public constructor() {
        this.setUpDependencies();
    }
	
    private setUpDependencies(): void {
        this._logger = container.get<Logger>(TYPES.logger);
        this._appServer = container.get<AppServer>(TYPES.appServer);
        this._database = container.get<Database>(TYPES.database);
    }

    public get logger(): Logger {
        return this._logger;
    }
	
    public get appServer(): AppServer {
        return this._appServer;
    }
	
    public get database(): Database {
        return this._database;
    }
}
