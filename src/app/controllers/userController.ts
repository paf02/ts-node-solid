
import * as mongoose from 'mongoose';
import * as httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Repository, Controller, RepositoryModel, Parser, AccessToken } from '../interfaces';
import { User } from '../models';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MongoRepository } from '../persistence';
import { to } from '../services';
import { UserMongoModel } from '../repositoryModels';

@injectable()
export default class UserController implements Controller{
    private repository: Repository<User, mongoose.Document>;
    private jsonParser: Parser<any, string>;
    private repositoryModel: UserMongoModel;
    private accessToken: AccessToken;

    public constructor(@inject(TYPES.userRepositoryModel) repositoryModel: RepositoryModel<mongoose.Schema>,
		@inject(TYPES.jsonParser) jsonParser: Parser<any, string>,
		@inject(TYPES.accessToken) accessToken: AccessToken){
        this.repository = new MongoRepository<User>(repositoryModel);
        this.jsonParser = jsonParser;
        this.repositoryModel = repositoryModel as UserMongoModel;
        this.accessToken = accessToken;
    }

    public async findAll(req: Request, res: Response): Promise<any>{
        let error: any;
        let users: [any];
        [error, users] = await to(this.repository.retrieve(this.jsonParser.parse(req.query.filter)));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!users) {
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: 'Users not found',
                data: null
            });
        }
        res.status(httpStatus.OK).send({
            success: true,
            data: users.map((x: Record<string, any>) => {
                const user = new User(x);
                delete user['password'];
                return user;
            })
        });
    }

    public async findOne(req: Request, res: Response): Promise<any> {
        let error: any;
        let user: any;
        [error, user] = await to(this.repository.retrieveByID(req.params.id));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        const result = new User(user);
        delete result['password'];
        res.status(httpStatus.OK).send({
            success: true,
            data: result
        });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const users = req.body.map((data: { employeeId: any; firstName: any; lastName: any; realm: any; username: any; password: any; email: any }) => new User({
            employeeId: data.employeeId,
            firstName: data.firstName,
            lastName: data.lastName,
            realm: data.realm,
            username: data.username,
            password: data.password,
            email: data.email
        }));
        let error: any, newUsers: any;
        [error, newUsers] = await to(this.repository.create(users));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!newUsers) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: 'Unable to create users',
                data: null
            });
        }
        res.status(httpStatus.OK).send({
            success: true,
            data: newUsers.map((x: Record<string, any>) => {
                const user = new User(x);
                delete user['password'];
                return user;
            })
        });
    }
	
    public async register(req: Request, res: Response): Promise<any> {
        const {
            employeeId,
            firstName,
            lastName,
            realm,
            username,
            password,
            email
        } = req.body;
        let error: any, user: any;
        [error, user] = await to(this.repository.create([new User({
            employeeId,
            firstName,
            lastName,
            realm,
            username,
            password,
            email
        })]));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!user) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: 'Unable to register user',
                data: null
            });
        }
        res.status(httpStatus.OK).send({
            success: true,
            data: user.map((x: Record<string, any>) => {
                const user = new User(x);
                delete user['password'];
                return user;
            })
        });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const {
            employeeId,
            firstName,
            lastName,
            realm,
            username,
            password,
            email
        } = req.body;
        let error: any, updatedUser: any;
        [error, updatedUser] = await to(this.repository.update(req.params.id, new User({
            employeeId,
            firstName,
            lastName,
            realm,
            username,
            password,
            email
        })));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!updatedUser) {
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        const result = new User(updatedUser);
        delete result['password'];
        res.status(httpStatus.OK).send({
            success: true,
            data: result
        });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        let error: any, user: any;
        [error, user] = await to(this.repository.delete(req.params.id));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        const result = new User(user);
        delete result['password'];
        res.status(httpStatus.OK).send({
            success: true,
            data: result
        });
    }
	
    public async login(req: Request, res: Response): Promise<any> {
        const {
            username,
            password,
            email
        } = req.body;
        let error: any, user: any;
        [error, user] = await to(this.repository.retrieveFirst({$or: [{username},{email}]}, '+password'));
        if(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        const matchPasswords = this.repositoryModel.validatePassword(password, user.password);
        if (!matchPasswords) {
            return res.status(httpStatus.UNAUTHORIZED).send({
			  success: false,
			  message: 'Not authorized'
            });
        }
        const token = this.accessToken.sign({email, username});
        res.status(httpStatus.OK).send({
            success: true,
            token
        });
    }
}