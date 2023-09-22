import Cookie from "@/core/application/common/models/Cookie";
import { RequestResponse } from "@/core/application/dto/common/responses/RequestResponse";



export interface IAccountManagementService {

    /**
     * Sign up with email
     * @param endpoint
     * @param params
     * @param context
     */
    signInWithEmailAsync(endpoint: string, params:any, context: Cookie): Promise<RequestResponse>;

    /**
     * Get my profile
     * @param endpoint
     * @param params
     * @param context
     */
    getMyProfileAsync(endpoint: string, params:any, context: Cookie): Promise<RequestResponse>;

    /**
     * Logout
     * @param endpoint
     * @param params
     * @param context
     */
    logoutAsync(endpoint: string, params:any, context: Cookie): Promise<RequestResponse>;

}