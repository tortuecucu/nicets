
export enum Status {
    pending = "pending",
    success = "success",
    error= "error"
}

type ListenerFunc = (status: Status) => void

type Suspender = Promise<void>

type ReadFunc = () => Suspender | Error | any

export type WrappedPromise = {
    read: ReadFunc
}

function wrapPromise(promise: Promise<any>, listener: ListenerFunc | undefined): WrappedPromise {
    let status: Status = Status.pending
    let response: any

    const suspender = promise.then(
        (res) => {
            status = Status.success
            response = res
        },
        (err) => {
            status = Status.error
            response = err
        },
    )
    const read = () => {
        if (listener) {
            listener(status)
        }
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return { read }
}

export default wrapPromise