import { Suspense, useMemo, createContext, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import wrapPromise, { Status, WrappedPromise } from "src/components/puller/wrapPromise"
import { Alert, Spinner } from "react-bootstrap"
import { AxiosResponse } from "axios"
import { useToastContext } from "src/contexts/ToastContext"
import { ChildrenProp } from "src/types/common"


const DefaultLoader = () => {
    return(
        <div className="hstack my-2">
            <Spinner animation="grow" variant="primary" />
            <span className="ms-2 align-middle h-100 fw-semibold text-secondary">Chargement...</span>
        </div>
    )
}

const DefaultError = () => {
    return(
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

type ResponseContextContent = {
    data: any
}

const ResponseContext = createContext<ResponseContextContent>({
    data: undefined
})

const useResponseContext = (): ResponseContextContent => {
    const {data} = useContext(ResponseContext)
    return {data}
}

type ResponseHandlerProps = {
    wrappedPromise: WrappedPromise,
    successFunc: (response: any) => boolean,
    dataFunc: (response: any)=> any,
    children: ChildrenProp,
    fallback: React.ReactElement
}

const ResponseHandler = (props: ResponseHandlerProps) => {
    const { wrappedPromise, successFunc, dataFunc } = props
    const response = wrappedPromise.read()

    const success = useMemo(() => {
        if (successFunc!==undefined) {
            return successFunc(response)
        } else {
            return true
        }
    }, [response, successFunc])

    return (
        <ResponseContext.Provider value={{ data: (dataFunc!==undefined) ? dataFunc(response) : response }}>
            {success && props.children}
            {!success && props.fallback}
        </ResponseContext.Provider>
    )
}
ResponseHandler.defaultProps = {
    successFunc: (response: any): boolean => {
        if (response && response?.success!==undefined) {
            return response.success
        } else {
            return true
        }
    },
    dataFunc: (response:any): any => {
        console.log('datafunc', response)
        if (response && response?.data!==undefined) {
            return response.data
        } else {
            return response
        }
    },
    fallback: <p>incorrect data returned</p>
}

export type DataManagerProps = {
    toast?: any,
    promise: ()=> Promise<any>,
    children: ChildrenProp,
    show?: boolean,
    loadingElement?: React.ReactElement,
    errorElement?: React.ReactElement,
    successFunc?: (data: any)=> boolean,
    fallback?: React.ReactElement
}

const DataManager = (props:DataManagerProps) => {
    const { showToast } = useToastContext()

    const toastListener = (status: Status) => {
        const display = () => {
            if (props.toast && props.toast[status]) {
                const msg = props.toast[status]
                showToast({ severity: "info", summary: msg.title, detail: msg.message, life: 3000 })
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
        if (props.toast) {
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
    toast: {
        success: {
            title: 'réussi',
            message: 'opération réussie'
        },
        error: {
            title: 'erreur',
            message: 'une erreur est survenue'
        }
    }
}

export { DataPuller, axiosSuccess, ResponseContext, ResponseHandler, DataManager, useResponseContext }