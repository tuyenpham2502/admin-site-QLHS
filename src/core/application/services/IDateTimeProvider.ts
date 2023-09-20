/**
 * Provide datetime service
 */
export interface IDateTimeProvider {
    // Get current datetime and return datetime string
    currentDateTime(format:string):string
}
