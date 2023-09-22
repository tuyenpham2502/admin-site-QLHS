import {IDateTimeProvider} from "src/core/application/services/IDateTimeProvider";
import Constants from "@/core/application/common/Constants";
import moment from "moment";

export default class DateTimeProvider implements IDateTimeProvider {
    currentDateTime(format: string = Constants.Logger.DateTimeFormat) {
        return (moment(new Date())).format(format);
    }

}
