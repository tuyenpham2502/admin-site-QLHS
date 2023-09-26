import Constant from "@/core/application/common/Constants";
import NetworkException from "@/core/application/common/exceptions/NetworkException";
import Cookie from "@/core/application/common/models/Cookie";
import FailureResponse from "@/core/application/dto/common/responses/FailureResponse";
import InvalidModelStateResponse from "@/core/application/dto/common/responses/InvalidModelStateResponse";
import { RequestResponse } from "@/core/application/dto/common/responses/RequestResponse";
import SuccessResponse from "@/core/application/dto/common/responses/SuccessResponse";
import { IAccountManagementService } from "@/core/application/identity/account/services/IAccountManagementService";
import CookieService from "@/infrastructure/services/CookieService";
import LocalStorageService from "@/infrastructure/services/LocalStorageService";
import LoggerService from "@/infrastructure/services/LoggerService";
import RequestService from "@/infrastructure/services/RequestService";



export class AccountManagementService implements IAccountManagementService {
    private readonly loggerService = new LoggerService();
    private readonly localStorageService = new LocalStorageService();
    private readonly cookie = new CookieService();

    public async signInWithEmailAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makePostRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                this.localStorageService.setStorage(Constant.API_TOKEN_STORAGE, new Cookie(true, (result as SuccessResponse).data.signInWithEmail.token, (result as SuccessResponse).data.signInWithEmail.refreshToken));
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

    public async getMyProfileAsync(endpoint: string, params: any, cookie: Cookie): Promise<RequestResponse> {
        try {
            let result = await new RequestService().makeGetRequestAsync(endpoint, params, cookie);
            if(result.status == 200) {
                return result as SuccessResponse;
            }
            if(result.status == 201) {
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
            if(result.status == 201) {
                return result as FailureResponse;
            }
            throw new NetworkException('No http status code handler');
        } catch (e) {
            this.loggerService.error(e);
            throw e;
        }
    }
    
}