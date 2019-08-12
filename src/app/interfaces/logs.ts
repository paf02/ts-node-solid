export default interface Logs {
    winston: {
        filename: string;
        file: {
            level: string;
        };
        console: {
            level: string;
        };
    };
}