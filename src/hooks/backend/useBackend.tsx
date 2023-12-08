
import { useApi } from "../../contexts/ApiProvider"
import type { AxiosPromise } from 'axios';

type Map = { [key: string]: any }

type Error = Map

type HandlerPromise = Promise<[any, Error]>

type Handler = (
    url: string,
    data?: Map,
    config?: Map
) => HandlerPromise

type Method = (
    url: string,
    data?: Map,
    config?: Map
) => any

type BackendHook = {
    get: Method,
    post: Method,
    put: Method,
    deleteRequest: Method,
    getHandler: Handler,
    postHandler: Handler,
    putHandler: Handler,
    deleteHandler: Handler,
    response: any //TODO: define it
}

type Response = {
    success: boolean,
    data?: any,
    request: any,
    error?: Error,
    query?: Map
}

const useBackend = (): BackendHook => {
    const api = useApi()

    const get = (url: string, config?: Map): AxiosPromise<any> => {
        return api.getRequest(url, config)
    }

    const post = (url: string, data?: Map, config?: Map): AxiosPromise<any> => {
        return api.postrequest(url, data, config)
    }

    const put = (url: string, data?: Map, config?: Map): AxiosPromise<any> => {
        return api.putRequest(url, data, config)
    }

    const deleteRequest = (url: string, config?: Map): AxiosPromise<any> => {
        return api.deleteRequest(url, config)
    }

    const getHandler = (url: string, defaultValue?: any): HandlerPromise => {
        return api.getHandler(url, defaultValue)
    }

    const postHandler = (url: string, data?: Map, config?: Map): HandlerPromise => {
        return api.postHandler(url, data, config)
    }

    const putHandler = (url: string, data?: Map, config?: Map): HandlerPromise => {
        return api.putHandler(url, data, config)
    }

    const deleteHandler = (url: string, config?: Map): HandlerPromise => {
        return api.deleteHandler(url, config)
    }

    const response = async (promise: () => Promise<any>): Promise<Response> => {
        const req = await promise()
        return {
            success: true, //FIXME: use function instead
            data: req.data,
            request: req,
            error: undefined, //FIXME: 
            query: undefined //FIXME: 
        }
    }
    
    return {get, post, put, deleteRequest, getHandler, postHandler, putHandler, deleteHandler, response}
}

export {useBackend}