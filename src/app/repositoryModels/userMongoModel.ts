import * as mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { MongoModel } from "../abstracts";
import { PasswordHandler } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export default class UserMongoModel extends MongoModel{
    private passwordHandler: PasswordHandler;
    public constructor(@inject(TYPES.passwordHandler) passwordHandler: PasswordHandler) {
        const schema = new mongoose.Schema({
            employeeId: {
                type: String,
                required: true,
                trim: true
            },
            firstName: {
                type: String,
                required: true,
                trim: true
            },
            lastName: {
                type: String,
                required: true,
                trim: true
            },
            realm: {
                type: String,
            },
            username: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
                trim: true,
                set: (value: string) => passwordHandler.encrypt(value),
                select: false
            },
            email: {
                type: String,
                unique: true,
                match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                required: true,
                trim: true
            }
        },
        {
            timestamps: true,
            useNestedStrict: true
        }
        );
        super({
            schema: schema,
            modelName: 'User'
        });
        this.passwordHandler = passwordHandler;
    }

    public validatePassword(value: string, password: string): boolean{
        return this.passwordHandler.compare(value, password);
    }
}