import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import NetworkException from "src/core/application/common/exceptions/NetworkException";
import LoggerService from "src/infrastructure/services/LoggerService";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { RequestResponse } from "src/core/application/dto/common/responses/RequestResponse";
import Cookie from "src/core/application/common/models/Cookie";
import RequestService from "src/infrastructure/services/RequestService";
import { IUploadManagementService } from "src/core/application/upload/services/IUploadManagement";

export class UploadManagementService implements IUploadManagementService {

    private readonly loggerService = new LoggerService();

    public async getFileAsync(url: string, params: any, context: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makeGetFileRequestAsync(url, params, context);
            if (result.status == 200) {
                return result as SuccessResponse;
            }
            if (result.status == 202) {
                return result as FailureResponse;
            }
            if (result.status == 400) {
                return result as InvalidModelStateResponse
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }

    public async uploadFileAsync(url: string, file: File, context: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makeUploadRequestAsync(url, file, context);
            if (result.status == 200) {
                return result as SuccessResponse;
            }
            if (result.status == 202) {
                return result as FailureResponse;
            }
            if (result.status == 400) {
                return result as InvalidModelStateResponse
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }

}