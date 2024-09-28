/**
 * An array of routes accessible to the public without login
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/public"
]

/**
 * Routes used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/signin",
    "/signup"
]

/**
 * Prefix for api authentication routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Path to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"

