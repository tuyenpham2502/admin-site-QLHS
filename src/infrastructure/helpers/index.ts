import Constant from "@/core/application/common/Constants"


export const validateFields = (isImplicitChange = false, key, isCheck, setError, error, message) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    } else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }

};

export const AuthErrors = (error: string) => {
    let authCodes = Constant.AuthErrorCodes;
    switch (error) {
        case authCodes.UserNotFound.code:
            return authCodes.UserNotFound.message;
        case authCodes.InvalidPassword.code:
            return authCodes.InvalidPassword.message;
        case authCodes.UserDisable.code:
            return authCodes.UserDisable.message;
    }

};
