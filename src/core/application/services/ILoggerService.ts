/*
Global logger service
 */
export interface ILoggerService {
    warn(...params:any[]);
    trace(...params:any[]);
    debug(...params:any[]);
    info(...params:any[]);
    error(...params:any[]);
    fatal(...params:any[]);

}
