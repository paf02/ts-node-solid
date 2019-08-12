import * as Ajv from 'ajv';
import { injectable } from "inversify";
import { Validator } from '../interfaces';

@injectable()
export default class AjvValidator implements Validator{
    public validate(data: Record<string, any>, schema: Record<string, any>): Record<string, any>{
        const ajv = new Ajv({allErrors: true});
        const valid = ajv.validate(schema, data);
        return {valid: valid, errors: ajv.errors};
    }
}
