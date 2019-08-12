import { createLogger, transports, format } from 'winston';
import { join } from 'path';
import * as moment from 'moment'
import { injectable, inject } from 'inversify';
import { LoggerConfig, Dir, Logs } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export default class Winston {
    private winston: any; 

    public constructor(@inject(TYPES.loggerConfig) loggerConfig: LoggerConfig) {
        const prop = this.setProperties(loggerConfig.dir, loggerConfig.logs);
        this.winston = this.buildWinston(prop);
    }

    public Error(newLog: string): void {
        this.winston.error(newLog + '');
    }

    public Warn(newLog: string): void{
        this.winston.warn(newLog + '');
    }

    public Info(newLog: string): void {
        this.winston.info(newLog + '');
    }

    public Verbose(newLog: string): void {
        this.winston.verbose(newLog + '');
    }

    public Debug(newLog: string): void {
        this.winston.debug(newLog + '');
    }

    public Silly(newLog: string): void {
        this.winston.silly(newLog + '');
    }

    private setProperties(dir: Dir, logs: Logs): any {
        return {
            winston: {
                file: {
				  	level: logs.winston.file.level,
				  	filename: join(dir.logs, `${logs.winston.filename}.log`),
				  	colorize: true,
                    json: true,
                    timestamp: true
                },
                console: {
				  	level: logs.winston.console.level,
				  	json: false,
                    colorize: true,
                    timestamp: true
                },
            },
            stream: {
                options: { flags: 'a' }
            }
        }
    }

    private buildWinston(_prop): any {
        const { combine, timestamp, printf } = format;

        const myFormat = printf(({ level, message, timestamp }) => {
            const date = moment(timestamp);
            return `${date.format('MM/DD/YYYY, hh:mm:ss:SSS a')} - ${level}: ${message}`;
        });

        return createLogger({
            format: combine(
                timestamp(),
                myFormat
            ),
            transports: [
			  	new transports.File(_prop.winston.file),
			  	new transports.Console(_prop.winston.console)
            ]
        });
    }
}