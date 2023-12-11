import { AxiosResponse } from "axios"
import { useToastContext } from "src/contexts/ToastContext"
import { PromiseProvider } from "src/types/common"

const usePusher = () => {
    const { errorToast, warningToast, successToast } = useToastContext()

    const promiseHandler = (func: PromiseProvider, onThen: (data: any) => void, onCatch: (e: Error) => void) => {
        func()
        .then(
            data => onThen(data)
        )
        .catch(
            err => onCatch(err)
        )
    }

    type Evaluator = (resp: AxiosResponse) => boolean
    type Callback = (resp: AxiosResponse) => void
    
    const handleAxiosResponse = (evaluator: Evaluator, onSuccess: Callback, onFail: Callback) => {
        return (resp: AxiosResponse) => {
            if (evaluator(resp)) {
                onSuccess(resp)
            } else {
                onFail(resp)
            }
        }
    }

    const onError = (title: string, message: string) => {
        return (err: Error) => {
            console.error(err)
            errorToast(title, message)
        }
    }

    const codesEvaluator = (codes: Array<number>) => {
        return (code: number) => {
            return codes.includes(code)
        }
    }

    const defaultOptions = {
        evaluator: {
            func: codesEvaluator,
            params: [
                [200]
            ]
        },
        success: {
            title: 'Succès',
            message: 'Votre action a été enregistrée'
        },
        failure: {
            title: 'Echec',
            message: "Votre action n\'a pu aboutir"
        },
        error: {
            title: 'Erreur',
            message: 'Merci de réessayer ultérieurement'
        }
    }

    type ResultMessage = {
        title: string,
        message: string
    }

    type pushDataOptions = {
        evaluator: {
            func: Evaluator,
            params: any
        },
        success: ResultMessage,
        failure: ResultMessage
    }

    const pushData = (func: () => Promise<any>, options: pushDataOptions) => {
        const settings = {
            ...defaultOptions,
            ...options
        }
        promiseHandler(
            func,
            handleAxiosResponse(
                settings.evaluator.func,
                () => {successToast(settings.success.title, settings.success.message)},
                () => {warningToast(settings.failure.title, settings.failure.message)}
            ),
            onError(settings.error.title, settings.error.message)
        )
    }

    return {pushData}
}

export {usePusher}