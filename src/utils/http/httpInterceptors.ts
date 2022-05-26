import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { authenticationService } from '../auth.service'

/*
 * Handle pre request
 * 1. Retrieve auth token from local storage and append in header if exists
 * 2. Return responseProduct BASE URL
 */
export function handlePreRequest(config: AxiosRequestConfig) {
    const token: any = authenticationService.authToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

/*
 * Handle request error while sending any data to API
 */
export function handleRequestError(error: AxiosError) {
    return Promise.reject(error)
}

/*
 * Handle response Success
 */
export function handleResponseSuccess(response: AxiosResponse) {
    return response.data
}

/*
 * Handle response Error
 * 1. Check for 401 and 403 response code from server and logout
 */
export function handleResponseError(error: AxiosError) {
    // if (
    //     error.response && [401].includes(error.response.status)
    // ) {
    //     authenticationService.localLogout()
    // }
    return Promise.reject((error && error.response && error.response.data) || error)
}
