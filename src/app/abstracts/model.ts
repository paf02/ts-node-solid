export default abstract class Model{
    protected id: string;
    protected createdAt: Date;
    protected updatedAt: Date;
	
    protected constructor(data: Record<string, any> = {id: '', createdAt: new Date(), updatedAt: new Date()}) {
        this.fromJson(data);
    }

    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    public get CreatedAt(): Date {
        return this.createdAt;
    }
    public set CreatedAt(value: Date) {
        this.createdAt = value;
    }

    public get UpdatedAt(): Date {
        return this.updatedAt;
    }
    public set UpdatedAt(value: Date) {
        this.updatedAt = value;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
	
    public fromJson(json: Record<string, any> = {id: '', createdAt: new Date(), updatedAt: new Date()}): void {
        this.id = json.id || '';
        this.createdAt = json.createdAt || new Date();
        this.updatedAt = json.updatedAt || new Date();
    }
}