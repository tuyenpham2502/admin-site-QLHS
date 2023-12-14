import {RequestResponse} from "./RequestResponse";

export default class InvalidModelStateResponse extends RequestResponse{
    status: number = 401;
    errors: any = {};

    constructor(errors: any) {
        super(400);
        this.errors = errors;
    }
}
