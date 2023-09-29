import {RequestResponse} from "./RequestResponse";

export default class FailureResponse extends RequestResponse{
    status: number = 201;
    errors: string = '';

    constructor(errors: string) {
        super(201);
        this.errors = errors;
    }

}

export class ErrorItem {
    fieldName: string = '';
    message: string = '';
    extensions: any;
}
