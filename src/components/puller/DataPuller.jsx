import PropTypes from "prop-types"
import { Suspense, useMemo, createContext, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import wrapPromise from "./wrapPromise"
import { ToastContext } from "../../pages/Layout"
import { Alert, Spinner } from "react-bootstrap"


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

const DataPuller = (props) => {
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
DataPuller.propTypes = {
    children: PropTypes.element,
    show: PropTypes.bool,
    loadingElement: PropTypes.element,
    errorElement: PropTypes.element,
}
DataPuller.defaultProps = {
    show: true,
    errorElement: <DefaultError />,
    loadingElement: <DefaultLoader />
}

const axiosSuccess = (codes) => {
    return (data) => {
        return codes.includes(data.status)
    }
}

const ResponseContext = createContext()

const ResponseHandler = (props) => {
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
ResponseHandler.propTypes = {
    wrappedPromise: PropTypes.func,
    successFunc: PropTypes.func,
    dataFunc: PropTypes.func,
    children: PropTypes.element,
    fallback: PropTypes.element
}
ResponseHandler.defaultProps = {
    successFunc: (response) => {
        if (response && response?.success!==undefined) {
            return response.success
        } else {
            return true
        }
    },
    dataFunc: (response) => {
        console.log('datafunc', response)
        if (response && response?.data!==undefined) {
            return response.data
        } else {
            return response
        }
    },
    fallback: <p>incorrect data returned</p>
}

const DataManager = (props) => {
    const { showToast } = useContext(ToastContext);

    const toastListener = (status) => {
        const display = () => {
            if (props.toast && props.toast[status]) {
                const msg = props.toast[status]
                showToast({ severity: status, summary: msg.title, detail: msg.message, life: 3000 })
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

    const wrapped = () => {
        if (props.toast) {
            return wrapPromise(props.promise(), toastListener)
        } else {
            return wrapPromise(props.promise())
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
DataManager.propTypes = {
    toast: PropTypes.object,
    promise: PropTypes.func,
    children: PropTypes.element,
    show: PropTypes.bool,
    loadingElement: PropTypes.element,
    errorElement: PropTypes.element,
    successFunc: PropTypes.func,
    fallback: PropTypes.element
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

export { DataPuller, axiosSuccess, ResponseContext, ResponseHandler, DataManager }