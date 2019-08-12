import { Model } from "../abstracts";

export default class User extends Model{
    private employeeId: string;
    private firstName: string;
    private lastName: string;
    private realm: string;
    private username: string;
    private password: string;
    private email: string;

    public constructor(data: Record<string, any> = {
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        employeeId: '',
        firstName: '',
        lastName: '',
        realm: '',
        username: '',
        password: '',
        email: ''
    }) {
        super(data);
    }

    public fromJson(json: Record<string, any> = {
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        employeeId: '',
        firstName: '',
        lastName: '',
        realm: '',
        username: '',
        password: '',
        email: ''
    }): void {
        super.fromJson(json);
        this.employeeId = json.employeeId || '';
        this.firstName = json.firstName || '';
        this.lastName = json.lastName || '';
        this.realm = json.realm || '';
        this.username = json.username || '';
        this.password = json.password || '';
        this.email = json.email || '';
    }

    public get EmployeeId(): string{
        return this.employeeId;
    }
    public set EmployeeId(value: string){
        this.employeeId = value;
    }

    public get FirstName(): string{
        return this.firstName;
    }
    public set FirstName(value: string){
        this.firstName = value;
    }

    public get LastName(): string{
        return this.lastName;
    }
    public set LastName(value: string){
        this.lastName = value;
    }

    public get Realm(): string{
        return this.realm;
    }
    public set Realm(value: string){
        this.realm = value;
    }

    public get Username(): string{
        return this.username;
    }
    public set Username(value: string){
        this.username = value;
    }

    public get Password(): string{
        return this.password;
    }
    public set Password(value: string){
        this.password = value;
    }

    public get Email(): string{
        return this.email;
    }
    public set Email(value: string){
        this.email = value;
    }
}