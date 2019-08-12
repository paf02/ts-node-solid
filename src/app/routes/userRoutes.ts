import { Router, Request, Response } from 'express';
import { Route, Controller, Authorization } from '../interfaces';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { UserController } from '../controllers';

@injectable()
export default class UserRoutes implements Route{
    public controller: UserController;
    private authorization: Authorization;

    public constructor(@inject(TYPES.userController) controller: Controller,
		@inject(TYPES.authorization) authorization: Authorization) {
        this.controller = controller as UserController;
        this.authorization = authorization;
    }

    public getRoutes(): any {
        const user: Router = Router();
        // Retrieve all Users
        user.get('/users', this.authorization.verifyToken, (req: Request, res: Response) => this.controller.findAll(req, res));
        // Retrieve user by id
        user.get('/users/:id', this.authorization.verifyToken, (req: Request, res: Response) => this.controller.findOne(req, res));
        // Create users
        user.post('/users', this.authorization.verifyToken, (req: Request, res: Response) => this.controller.create(req, res));
        // Update user
        user.put('/users/:id', this.authorization.verifyToken, (req: Request, res: Response) => this.controller.update(req, res));
        // Delete user
        user.delete('/users/:id', this.authorization.verifyToken, (req: Request, res: Response) => this.controller.delete(req, res));
        // Register user
        user.post('/users/register', (req: Request, res: Response) => this.controller.register(req, res));
        // Login user
        user.post('/users/login', (req: Request, res: Response) => this.controller.login(req, res));
        return user;
    }
}