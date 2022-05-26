import { AxiosResponse, AxiosRequestConfig } from 'axios'
import instance from './httpInstance'

const validateStatus = function (status: number) {
    return status < 400
}

/*
 * Get method
 */
export function get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    return instance.get(url, { ...config, validateStatus })
}

/*
 * Post method
 */
export function post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<R> {
    return instance.post(url, data, { ...config, validateStatus })
}

/*
 * Put method
 */
export function put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<R> {
    return instance.put(url, data, { ...config, validateStatus })
}

/*
 * Patch method
 */
export function patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<R> {
    return instance.patch(url, data, { ...config, validateStatus })
}

/*
 * Delete method
 */
export function del<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    return instance.delete(url, config)
}
