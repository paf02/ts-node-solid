import * as httpStatus from 'http-status';
import { Authorization, AccessToken } from "../interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export default class JwtAuthorization implements Authorization {
    private accessTokenService: AccessToken;

    public constructor(@inject(TYPES.accessToken) accessTokenService: AccessToken) {
        this.accessTokenService = accessTokenService;
    }

    public verifyToken = (req: any, res: any, next: any): Promise<any> => {
        const self = this;
        const token: string = self.accessTokenService.readAccessToken(req);
        if(!token) {
            return res.status(httpStatus.FORBIDDEN).send({
                auth: false,
                message: 'No token provided'
            });
        }
        try {
            const decoded = self.accessTokenService.verify(token);
            if(decoded) {
                next();
            }
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ auth: false, message: error });
        }
    }
}