import { inject, injectable } from 'inversify';
import * as mongoose from 'mongoose';
import { Database, DatabaseConfig, Logger } from './../interfaces';
import { TYPES } from '../types';
import { to } from '../services';

@injectable()
export default class MongoDb implements Database{
    private config: DatabaseConfig;
    private logger: Logger;

    public constructor(@inject(TYPES.logger) logger: Logger,
		@inject(TYPES.databaseConfig) config: DatabaseConfig) {
        this.config = config;
        this.logger = logger;
        mongoose.set('useCreateIndex', true);
    }

    public async connect(): Promise<any> {
        let error: any;
        [error] = await to(mongoose.connect(
            this.config.connectionString,
            { useNewUrlParser: true }
        ));
        if(error) {
            throw error;
        }
    }
}
