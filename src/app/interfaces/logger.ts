export default interface Logger {
    Error: (newLog: string) => void;
    Warn: (newLog: string) => void;
    Info: (newLog: string) => void;
    Verbose: (newLog: string) => void;
    Debug: (newLog: string) => void;
    Silly: (newLog: string) => void;
}