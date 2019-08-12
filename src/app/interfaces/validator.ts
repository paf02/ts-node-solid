export default interface Validator {
  	validate: (data: Record<string, any>, schema: Record<string, any>) => Record<string, any>;
}