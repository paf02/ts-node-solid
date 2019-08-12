
import { Parser } from './../interfaces';
import { injectable } from 'inversify';

@injectable()
export default class JsonParser implements Parser<any, string> {
    public parse(value: string): any {
        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    }
}