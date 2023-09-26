import {IDateTimeProvider} from "src/core/application/services/IDateTimeProvider";
import Constants from "src/core/application/common/constants";
import moment from "moment";

export default class DateTimeProvider implements IDateTimeProvider {
    currentDateTime(format: string = Constants.Logger.DateTimeFormat) {
        return (moment(new Date())).format(format);
    }

}
