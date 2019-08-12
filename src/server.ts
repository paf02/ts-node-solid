import "reflect-metadata";
import DependencyResolver from './app/dependencyResolver';
import { AppServer, Database, Logger } from './app/interfaces';
import { to } from './app/services';

export default class Server {
    private appServer: AppServer;
    private database: Database;
    private logger: Logger;

    public constructor() {
        const dependencyResolver = new DependencyResolver();
        this.appServer = dependencyResolver.appServer;
        this.database = dependencyResolver.database;
        this.logger = dependencyResolver.logger;
        this.setupProcessEvents();
        this.initApp();
    }
	
    private async initApp(): Promise<any> {
        let error: any;
        [error] = await to(this.database.connect());
        if (error) {
            this.logger.Error(`Could not access the database. ${error}`);
            process.exit(1);
        }
		
        /* const user = new User({
			employeeId: '051947',
			firstName: 'Pablo',
			lastName: 'Montero',
			realm: 'Pablo Montero',
			username: 'montero02',
			password: 'testing',
			email: 'pallito020390@hotmail.com'
		});
		let data: any;
		[error,data] = await to(this.userRepository.create([user]));
		if (error) {
            this.logger.Error(`Error creating user. ${error}`);
            process.exit(1);
		}
		this.logger.Debug(JSON.stringify(data)); */

        this.appServer.initServer();
    }

    private setupProcessEvents(): void {
        //catch uncaught exceptions, trace, then exit normally
        process.on('uncaughtException', (error) => {
            this.logger.Error('Uncaught Exception');
            this.logger.Error(error.message);
            this.logger.Error(error.stack);
            process.exit(1);
        });
		
        process.on('unhandledRejection', (error) => {
            this.logger.Error('unhandledRejection');
            this.logger.Error(error.message);
            this.logger.Error(error.stack);
            process.exit(1);
        });
        // do app specific cleaning before exiting
        process.on('exit', () => {
        });

        // catch ctrl+c event and exit normally
        process.on('SIGINT', () => {
            this.logger.Info('SIGINT Closing app');
            process.exit(2);
        });
    }
}

new Server();
