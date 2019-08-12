export default interface Repository<modelType, resultType> {
    retrieve: (item: any) => Promise<resultType[]>;
    retrieveByID: (id: string) => Promise<resultType>;
    create: (items: modelType[]) => Promise<resultType[]>;
    update: (id: string, item: modelType) => Promise<resultType>;
    delete: (id: string) => Promise<resultType>;
    retrieveFirst: (item: any, select?: any) => Promise<resultType>;
}