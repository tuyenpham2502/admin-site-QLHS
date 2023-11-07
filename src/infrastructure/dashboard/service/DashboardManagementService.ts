import NetworkException from "src/core/application/common/exceptions/NetworkException";
import Cookie from "src/core/application/common/models/Cookie";
import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import { RequestResponse } from "src/core/application/dto/common/responses/RequestResponse";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { IDashboardManagementService } from "src/core/application/dashboard/services/IDashboardManagementService";
import CookieService from "src/infrastructure/services/CookieService";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import LoggerService from "src/infrastructure/services/LoggerService";
import RequestService from "src/infrastructure/services/RequestService";



export class DashboardManagementService implements IDashboardManagementService {
    private readonly loggerService = new LoggerService();
    private readonly localStorageService = new LocalStorageService();
    private readonly cookie = new CookieService();

    public async getFilms(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makeGetRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                return result as SuccessResponse ;
            }
            if(result.status == 201) {
                return result as FailureResponse;
            }
            if(result.status == 400) {
                return result as InvalidModelStateResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }

    public async getLatestFilmAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makePostRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                return result as SuccessResponse ;
            }
            if(result.status == 201) {
                return result as FailureResponse;
            }
            if(result.status == 400) {
                return result as InvalidModelStateResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }

    public async getLatestUsers(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makePostRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                return result as SuccessResponse ;
            }
            if(result.status == 201) {
                return result as FailureResponse;
            }
            if(result.status == 400) {
                return result as InvalidModelStateResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }

    
}