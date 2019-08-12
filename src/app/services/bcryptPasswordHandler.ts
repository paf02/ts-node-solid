import * as bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { PasswordHandler, PasswordHandlerConfig } from "../interfaces";
import { TYPES } from '../types';

@injectable()
export default class BcryptPasswordHandler implements PasswordHandler{
    private config: PasswordHandlerConfig;

    public constructor(@inject(TYPES.passwordHandlerConfig) config: PasswordHandlerConfig) {
        this.config = config;
    }

    public encrypt(value: string): string{
        return bcrypt.hashSync(value, this.config.saltRounds);
    }

    public compare(value: string, hash: string): boolean{
        return bcrypt.compareSync(value, hash);
    }
}