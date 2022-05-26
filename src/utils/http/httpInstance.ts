import axios from 'axios'
import {
    handlePreRequest,
    handleRequestError,
    handleResponseSuccess,
    handleResponseError,
} from './httpInterceptors'
import { baseURL, timeout } from '../constants/urls'

/*
 * Instantiation of axios with defaults
 */
const instance = axios.create({
    baseURL,
    timeout,
})

/*
 * Interceptors for request and response
 * 1. Handle pre request data
 * 2. Handle request error if any
 * 3. Handle response success
 * 4. Handle response error
 */
instance.interceptors.request.use(handlePreRequest, handleRequestError)
instance.interceptors.response.use(handleResponseSuccess, handleResponseError)

export default instance
