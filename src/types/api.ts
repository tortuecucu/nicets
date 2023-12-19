export type BackendResponse<T> = Promise< ResponseSuccess<T> | ResponseError >

type ResponseError = [
    response: null,
    error: Error
]

type ResponseSuccess<T> = [
    response: T,
    error: null
]
