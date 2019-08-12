export default interface RepositoryModel<schemaType> {
    getSchema: () => schemaType;
    getModelName: () => string;
}