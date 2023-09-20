import {AxiosRequestConfig, CancelToken} from "axios";
import {RequestResponse} from "src/core/application/dto/common/responses/RequestResponse";
import Cookie from "../common/models/Cookie";

export interface IRequestService {
    /**
     * Build request configurations including content-type, authorization header, cancellation token
     * @param cancellationToken: Token to cancel request if needed
     */


    makeGetRequestAsync(endpoint: string, params: any, context: Cookie): Promise<RequestResponse>;

    /**
     * Make POST request to the endpoint
     * @param endpoint
     * @param params
     * @param context
     * @param cancellationToken
     */
    makePostRequestAsync(endpoint: string, params: object, context: Cookie ): Promise<RequestResponse>

    makeUploadRequestAsync(endpoint: string, file: File, context: Cookie ): Promise<RequestResponse>

    makePutRequestAsync();

    makeDeleteRequestAsync();
}
