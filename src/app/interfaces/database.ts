export default interface Database{
    connect: () => Promise<any>;
}