import Constant from "src/core/application/common/Constants";
import NetworkException from "src/core/application/common/exceptions/NetworkException";
import Cookie from "src/core/application/common/models/Cookie";
import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import { RequestResponse } from "src/core/application/dto/common/responses/RequestResponse";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { IAccountManagementService } from "src/core/application/identity/account/services/IAccountManagementService";
import CookieService from "src/infrastructure/services/CookieService";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import LoggerService from "src/infrastructure/services/LoggerService";
import RequestService from "src/infrastructure/services/RequestService";



export class AccountManagementService implements IAccountManagementService {
    private readonly loggerService = new LoggerService();
    private readonly localStorageService = new LocalStorageService();
    private readonly cookie = new CookieService();

    public async signInWithEmailAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makePostRequestAsync(endpoint, params, cookie);
            console.log(result);
            if(result.status == 200) {
                this.localStorageService.setStorage(Constant.API_TOKEN_STORAGE, new Cookie(true, (result as SuccessResponse).data.token, (result as SuccessResponse).data.refreshToken));
                return result as SuccessResponse ;
            }
            if(result.status == 202) {
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

    public async getMyProfileAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makeGetRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                return result as SuccessResponse;
            }
            if(result.status == 202) {
                return result as FailureResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            
            throw e;
        }
    }

    public async logoutAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makePostRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                this.localStorageService.setStorage(Constant.API_TOKEN_STORAGE, new Cookie(false, "", ""));
                return result as SuccessResponse;
            }
            if(result.status == 202) {
                return result as FailureResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }
    
}