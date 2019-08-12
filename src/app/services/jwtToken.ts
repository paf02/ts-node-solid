import * as jwt from 'jsonwebtoken';
import { AccessToken, AccessTokenConfig } from "../interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export default class JwtToken implements AccessToken {
    private config: AccessTokenConfig;

    public constructor(@inject(TYPES.accessTokenConfig) config: AccessTokenConfig) {
        this.config = config;
    }

    public verify(token: any): any | never {
        return jwt.verify(token, this.config.secret);
    }

    public readAccessToken(req: any): string {
        return req.headers.authorization || req.headers.access_token || req.query.token || req.body.token || req.headers['x-access-token'];
    }

    public sign(data: any): any {
        return jwt.sign(data, this.config.secret, {
            expiresIn: this.config.expiration
        });
    }
}