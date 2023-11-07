import Constant from "src/core/application/common/constants"


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




export const formatTotalCatalog = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

