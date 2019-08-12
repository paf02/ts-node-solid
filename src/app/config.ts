import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Environment } from './interfaces';

if(process.env.NODE_ENV === "local") {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;
const environments = {
    local: {
        accessTokenConfig: {
            expiration: '4h',
            secret: '45B2ED8AC677B7FD661DB45458B61'
        },
        apiDocConfig: {
            document: './swagger.yaml',
            options: {
                explorer: true
            }
        },
        passwordHandlerConfig: {
            saltRounds: 15
        },
        databaseConfig: {
            connectionString: 'mongodb://localhost:27017/rest_template_db'
        },
        appServerConfig: {
            port: PORT
        },
        loggerConfig: {
            dir: {
                logs: '../../logs'
            },
            logs: {
                winston: {
                    filename: 'log',
                    file: {
                        level: 'silly',
                    },
                    console: {
                        level: 'silly',
                    },
                },
            }
        }
    },
    dev: {
        accessTokenConfig: {
            expiration: '4h',
            secret: '45B2ED8AC677B7FD661DB45458B61'
        },
        apiDocConfig: {
            document: './swagger.dev.yaml',
            options: {
                explorer: true
            }
        },
        passwordHandlerConfig: {
            saltRounds: 15
        },
        databaseConfig: {
            connectionString: ''
        },
        appServerConfig: {
            port: PORT
        },
        loggerConfig: {
            dir: {
                logs: 'logs'
            },
            logs: {
                winston: {
                    filename: 'log',
                    file: {
                        level: 'silly',
                    },
                    console: {
                        level: 'silly',
                    },
                },
            }
        }
    },
    test: {
        accessTokenConfig: {
            expiration: '4h',
            secret: '45B2ED8AC677B7FD661DB45458B61'
        },
        apiDocConfig: {
            document: './swagger.test.yaml',
            options: {
                explorer: true
            }
        },
        passwordHandlerConfig: {
            saltRounds: 15
        },
        databaseConfig: {
            connectionString: ''
        },
        appServerConfig: {
            port: PORT
        },
        loggerConfig: {
            dir: {
                logs: 'logs'
            },
            logs: {
                winston: {
                    filename: 'log',
                    file: {
                        level: 'silly',
                    },
                    console: {
                        level: 'silly',
                    },
                },
            }
        }
    },
    prod: {
        accessTokenConfig: {
            expiration: '4h',
            secret: '45B2ED8AC677B7FD661DB45458B61'
        },
        apiDocConfig: {
            document: './swagger.prod.yaml',
            options: {
                explorer: true
            }
        },
        passwordHandlerConfig: {
            saltRounds: 15
        },
        databaseConfig: {
            connectionString: ''
        },
        appServerConfig: {
            port: PORT
        },
        loggerConfig: {
            dir: {
                logs: 'logs'
            },
            logs: {
                winston: {
                    filename: 'log',
                    file: {
                        level: 'silly',
                    },
                    console: {
                        level: 'silly',
                    },
                },
            }
        }
    }
}

export default class Config {
    public currentConfig: Environment;
    protected static instance: Config;

    public constructor(environmentName? : string) {
        if (Config.instance) {
            return Config.instance;
        }

        Config.instance = this;
        this.currentConfig = this.setEnvironmentConfig(environmentName);
    }

    private getCurrentEnvironmentConfig(environmentName: string): Environment {
        return environments[environmentName];
    }

    private setEnvironmentConfig(environmentName: string): Environment {
        const currentConfig = this.getCurrentEnvironmentConfig(environmentName);
        for(let prop in currentConfig.loggerConfig.dir) {

            currentConfig.loggerConfig.dir[prop] = join(__dirname, currentConfig.loggerConfig.dir[prop]);
			
            if (environmentName === 'local') {
                currentConfig.loggerConfig.dir[prop] = currentConfig.loggerConfig.dir[prop].replace('dist', 'src');
            }
            if (!existsSync(currentConfig.loggerConfig.dir[prop])){
                mkdirSync(currentConfig.loggerConfig.dir[prop]);
            }
        }

        return currentConfig;
    }
}
