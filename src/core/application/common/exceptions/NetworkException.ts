export default class NetworkException extends Error{
    constructor(public message: string) {
        super(message);
        this.name = NetworkException.name;
        this.stack = (<any> new Error()).stack;
    }
}
