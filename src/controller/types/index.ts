
/**
 * Basic JSON Response for controller
 */

export type BasicResponse = {
    message: string;
}

/**
 * Error JSON Response for controller
 */
export type ErrorResponse = {
    error: string,
    message: String
}

/**
 * Output JSON Response for controller
 */
export type OutputResponse = {
    message: String
    date: Date
}
