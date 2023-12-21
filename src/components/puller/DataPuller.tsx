import { Suspense, useMemo, createContext, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import wrapPromise, { Status, WrappedPromise } from "src/components/puller/wrapPromise"
import { Alert, Spinner } from "react-bootstrap"
import { AxiosResponse } from "axios"
import { useToastContext } from "src/contexts/ToastContext"
import { ChildrenProp } from "src/types/common"
import { Render } from "../utils/Render"


const DefaultLoader = () => {
    return (
        <div className="hstack my-2">
            <Spinner animation="grow" variant="primary" />
            <span className="ms-2 align-middle h-100 fw-semibold text-secondary">Chargement...</span>
        </div>
    )
}

const DefaultError = () => {
    return (
        <Alert variant="warning">Une erreur est survenue, merci de réessayer</Alert>
    )
}

type DataPullerProps = {
    children: ChildrenProp,
    show: boolean,
    loadingElement: React.ReactElement,
    errorElement: React.ReactElement
}

const DataPuller = (props: DataPullerProps) => {
    return (
        <ErrorBoundary fallback={props.errorElement}>
            {props.show &&
                <Suspense fallback={props.loadingElement}>
                    {props.children}
                </Suspense>
            }
        </ErrorBoundary>
    )
}
DataPuller.defaultProps = {
    show: true,
    errorElement: <DefaultError />,
    loadingElement: <DefaultLoader />
}

const axiosSuccess = (codes: Array<number>): any => {
    return (response: AxiosResponse): boolean => {
        return codes.includes(response.status)
    }
}

type ResponseContextContent<S> = {
    data: S
}

const ResponseContext = createContext<ResponseContextContent<any>>({
    data: undefined
})

function useResponseContext<S>(): ResponseContextContent<S> {
    const { data } = useContext<ResponseContextContent<S>>(ResponseContext)
    return { data }
}

type ResponseHandlerProps = {
    wrappedPromise: WrappedPromise,
    successFunc?: (response: any) => boolean,
    dataFunc?: (response: any) => any,
    children: ChildrenProp,
    fallback: React.ReactElement
}

const ResponseHandler = (props: ResponseHandlerProps) => {
    const { wrappedPromise, successFunc, dataFunc } = props
    const response = wrappedPromise.read()

    const success = useMemo(() => {
        if (successFunc !== undefined) {
            return successFunc(response)
        } else {
            return true
        }
    }, [response, successFunc])

    return (
        <ResponseContext.Provider value={{ data: (dataFunc !== undefined) ? dataFunc(response) : response }}>
            <Render condition={(success === true)} fallback={props.fallback}>
                {props.children}
            </Render>
        </ResponseContext.Provider>
    )
}
ResponseHandler.defaultProps = {
    fallback: <p>incorrect data returned</p>
}

export type ToastContent = {
    title: string,
    message: string
}

export type ToastProp = {
    success: ToastContent,
    error: ToastContent
}

export type DataManagerProps = {
    toast?: ToastProp,
    promise: () => Promise<any>,
    children: ChildrenProp,
    show?: boolean,
    loadingElement?: React.ReactElement,
    errorElement?: React.ReactElement,
    successFunc?: (data: any) => boolean,
    dataFunc?: (data: any) => any,
    fallback?: React.ReactElement
}

const DataManager = (props: DataManagerProps) => {
    const { showToast } = useToastContext()

    const toastListener = (status: Status) => {
        const display = () => {
            let content: ToastContent | undefined = undefined
            if (props.toast && status === 'success') {
                content = props.toast.success
            } else if (props.toast && status === 'error') {
                content = props.toast.error
            }
            if (content) {
                showToast({ severity: "info", summary: content.title, detail: content.message, life: 3000 })
            }
        }

        switch (status) {
            case 'success':
                display()
                break;
            default:
                break;
        }
    }

    const wrapped = (): WrappedPromise => {
        if (props.toast !== undefined) {
            return wrapPromise(props.promise(), toastListener)
        } else {
            return wrapPromise(props.promise(), undefined)
        }
    }

    return (
        <DataPuller {...props}>
            <ResponseHandler wrappedPromise={wrapped()} {...props}>
                {props.children}
            </ResponseHandler>
        </DataPuller>
    )
}

DataManager.defaultProps = {
    show: true,
    errorElement: <DefaultError />,
    loadingElement: <DefaultLoader />
}
export { DataPuller, axiosSuccess, ResponseContext, ResponseHandler, DataManager, useResponseContext }