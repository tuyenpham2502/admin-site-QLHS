import { NextRouter } from "next/router";
import Cookie from "src/core/application/common/models/Cookie";
import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { notifyError, notifySuccess } from "src/infrastructure/common/components/controls/toast/toast-message";
import { filterError } from "src/infrastructure/helpers/index";
import LoggerService from "src/infrastructure/services/LoggerService";
import { UploadManagementService } from "src/infrastructure/upload/services/UploadManagementService";

export const uploadFileAsync = async (
    translator: any,
    loggerService: LoggerService,
    cookie: Cookie,
    onCallBackSuccess: Function,
    file: File,
    setFileName: Function,
) => {
    let response =
        await new UploadManagementService().uploadFileAsync(
            "FileStorage/UploadFile",
            file,
            cookie,
        );
    // Logged in ok, redirect to the home page
    if (response.status == 200) {
        notifySuccess(translator, translator("Upload dữ liệu thành công."));
        onCallBackSuccess();
        setFileName((response as SuccessResponse).data.fileName)
    }
    if (response.status == 202) {
        notifyError(translator, translator("Có lỗi xảy ra.Vui lòng liên hệ quản trị viên."));
    }
    if (response.constructor.name == InvalidModelStateResponse.name) {
        loggerService.info((response as InvalidModelStateResponse).errors);
    }
};