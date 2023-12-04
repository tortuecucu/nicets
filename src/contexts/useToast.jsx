import { useContext } from "react"
import { ToastContext } from "../pages/Layout"

const TOAST_LIFE = 3000

const useToast = () => {
    const {showToast} = useContext(ToastContext);

    const toast = (severity, title, message) => {
        showToast({ severity: severity, summary: title, detail: message, life: TOAST_LIFE });
    }

    const errorToast = (title, message) => {
        toast('error', title, message)
    }

    const warningToast = (title, message) => {
        toast('warning', title, message)
    }

    const successToast = (title, message) => {
        toast('success', title, message)
    }

    return {showToast, errorToast, warningToast, successToast};
}

export {useToast}