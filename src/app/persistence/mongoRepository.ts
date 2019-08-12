import * as mongoose from 'mongoose';
import { Repository, RepositoryModel } from './../interfaces';

export default class MongoRepository<modelType> implements Repository<modelType, mongoose.Document> {
    public model: mongoose.Model<mongoose.Document>;

    public constructor(schema: RepositoryModel<mongoose.Schema>) {
        this.model = mongoose.model(schema.getModelName(), schema.getSchema());
    }

    public retrieve(filter: any): Promise<mongoose.Document[]> {
        return new Promise((resolve, reject) => {
            this.model.find(filter, (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            })
        });
    }

    public retrieveByID(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ _id: id }, (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }
	
    public retrieveFirst(filter: any, select?: any): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            this.model.findOne(filter).select(select).exec((err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }

    public create(items: modelType[]): Promise<mongoose.Document[]> {
        return new Promise((resolve, reject) => {
            this.model.create(items, (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            })
        });
    }
  
    public update(id: string, item: modelType): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            this.model.findByIdAndUpdate(id, item, (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            })
        });
    }

    public delete(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            this.model.findByIdAndRemove(id , (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            })
        });
    }
}
