import {RequestResponse} from "./RequestResponse";

export default class FailureResponse extends RequestResponse{
    status: number = 202;
    errors: Array<ErrorItem> = [];

    constructor(errors: Array<ErrorItem>) {
        super(202);
        this.errors = errors;
    }

}

export class ErrorItem {
    fieldName: string = '';
    message: string = '';
    code : number = 0;
}
