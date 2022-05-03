
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
 * Auth JSON Response for controller
 */
export type AuthResponse = {
    message: string,
    token: String,
    id: String
}

/**
 * Output JSON Response for controller
 */
export type OutputResponse = {
    message: String
    date: Date
}
