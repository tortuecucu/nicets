import { useContext } from "react"
import { ToastContext } from "../../pages/Layout"

const usePusher = () => {
    const { errorToast, warningToast, successToast } = useContext(ToastContext);

    const promiseHandler = (func, onThen, onCatch) => {
        func()
        .then(
            data => onThen(data)
        )
        .catch(
            err => onCatch(err)
        )
    }
    
    const handleAxiosResponse = (evaluator, onSuccess, onFail) => {
        return (resp) => {
            if (evaluator(resp)) {
                onSuccess(resp)
            } else {
                onFail(resp)
            }
        }
    }

    const toaster = (success, title, message) => {
        return (data) => {
            if (success) {
                successToast(title, message)
            } else {
                warningToast(title, message)
            }
        }
    }

    const onError = (title, message) => {
        return (err) => {
            console.error(err)
            errorToast(title, message)
        }
    }

    const codesEvaluator = (codes) => {
        return (resp) => {
            return codes.includes(resp)
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


    const pushData = (func, options) => {
        const settings = {
            ...defaultOptions,
            ...options
        }
        promiseHandler(
            func,
            handleAxiosResponse(
                settings.evaluator.func(...settings.evaluator.params),
                toaster(...settings.success),
                toaster(...settings.failure)
            ),
            onError(...settings.error)
        )
    }

    return {pushData}
}

export {usePusher}