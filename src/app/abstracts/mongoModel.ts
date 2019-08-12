import { RepositoryModel } from "../interfaces";
import * as mongoose from 'mongoose';
import { injectable } from "inversify";

@injectable()
export default abstract class MongoModel implements RepositoryModel<mongoose.Schema> {
    private schema: mongoose.Schema;
    private modelName: string;

    protected constructor(data: Record<string, any> = {
        schema: null,
        modelName: '',
    }) {
        this.fromJson(data);
    }
	
    public fromJson(json: Record<string, any> = {
        schema: null,
        modelName: '',
    }): void {
        this.schema = json.schema || null;
        this.modelName = json.modelName || '';
    }
	
    public getSchema(): mongoose.Schema{
        return this.schema;
    };

    public getModelName(): string {
        return this.modelName;
    }
}