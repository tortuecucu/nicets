export type StringMap = {
    [k: string] : any
}

export type AnyProps = StringMap

export type ChildrenProp = React.ReactElement

export type CallbackProp = (...args: any[]) => void

export type PromiseProvider = () => Promise<any>

type BackendError = Error | null

export type BackendResponse<T> = Promise<[
    response: T | null,
    error: BackendError
]>

export type BackendBooleanResponse = Promise<[
    response: boolean | null,
    error: BackendError
]>

export type BackendNumberResponse = Promise<[
    response: number | null,
    error: BackendError
]>

export type ModelDatetime = string 

export type ToBeDefined = any