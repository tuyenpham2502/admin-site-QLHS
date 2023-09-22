export default class NotImplementedException extends Error{
    constructor(public message: string) {
        super(message);
        this.name = NotImplementedException.name;
        this.stack = (<any> new Error()).stack;
    }
}
