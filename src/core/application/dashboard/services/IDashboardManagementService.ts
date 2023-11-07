import Cookie from "src/core/application/common/models/Cookie";
import { RequestResponse } from "src/core/application/dto/common/responses/RequestResponse";



export interface IDashboardManagementService {

    /**
     * get top films
     * @param endpoint
     * @param params
     * @param context
     */
    getFilms(endpoint: string, params:any, context: Cookie): Promise<RequestResponse>;


    /**
     * get lastest users
     * @param endpoint
     * @param params
     * @param context
     */
    getLatestUsers(endpoint: string, params:any, context: Cookie): Promise<RequestResponse>;

}