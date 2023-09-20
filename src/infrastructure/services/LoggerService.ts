import {ILoggerService} from "src/core/application/services/ILoggerService";
import DateTimeProvider from "./DateTimeProvider";

export default class LoggerService implements ILoggerService {
    private readonly enabledLogger: boolean = process.env.NEXT_PUBLIC_EnabledLogger == 'true';

    debug(...params: any[]) {
        if (this.enabledLogger)
            console.debug(`[DEBUG] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

    error(...params: any[]) {
        if (this.enabledLogger)
            console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

    fatal(...params: any[]) {
        if (this.enabledLogger)
            console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

    info(...params: any[]) {
        if (this.enabledLogger)
            console.info(`[INFO] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

    trace(...params: any[]) {
        if (this.enabledLogger)
            console.trace(`[TRACE] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

    warn(...params: any[]) {
        if (this.enabledLogger)
            console.warn(`[WARN] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
    }

}
