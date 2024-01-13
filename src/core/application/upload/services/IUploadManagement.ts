import Cookie from "../../common/models/Cookie";

export interface IUploadManagementService {
    /**
     * get file
     * @param url
     * @param params
     * @param context
     */
    getFileAsync(url: string, params: any, context: Cookie): Promise<any>;
    /**
     * upload file
     * @param url
     * @param file
     * @param context
     */
    uploadFileAsync(url: string, file: any, context: Cookie): Promise<any>;
}