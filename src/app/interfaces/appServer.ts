export default interface AppServer {
    initServer: () => void;
    Server: () => any;
}