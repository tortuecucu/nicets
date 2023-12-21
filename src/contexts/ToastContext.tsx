import React, { useContext, createContext, useRef } from 'react';
import { Toast } from "primereact/toast";
import type { ToastMessage } from 'primereact/toast';

const TOAST_LIFE = 3000

export type ToastContextContent = {
    showToast: (message: ToastMessage) => void,
    errorToast: (title: string, message: string) => void, 
    warningToast: (title: string, message: string) => void, 
    successToast: (title: string, message: string) => void,
    retryLater: () => void,
}

const ToastContext = createContext<ToastContextContent>({
    showToast: () => {},
    errorToast: () => {},
    warningToast: () => {},
    successToast: () => {},
    retryLater: () => {},
})

type ToastContextProviderProps = {
    children: React.ReactNode
}

export type Severity = 'error' | 'warn' | 'success' | 'info'

const ToastContextProvider = (props: ToastContextProviderProps) => {
    const toastRef = useRef<Toast>()

    const showToast = (message: ToastMessage): void => {
        try {
            if (toastRef!==undefined && toastRef.current && toastRef.current) {
               toastRef.current.show(message); 
            } else {
                console.warn('unable to tast as reference is undefined')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const toast = (severity: Severity, title: string, message: string): void => {
        showToast({ severity: severity, summary: title, detail: message, life: TOAST_LIFE });
    }

    const errorToast = (title: string, message: string):void => {
        toast('error', title, message)
    }

    const warningToast = (title: string, message: string): void => {
        toast('warn', title, message)
    }

    const successToast = (title: string, message: string): void => {
        toast('success', title, message)
    }

    const retryLater = () => {
        errorToast('Oups, une erreur est survenue!', 'MErci de réessayer ultérieurement')
    }

    return (
        <>
            <Toast ref={toastRef} />
            <ToastContext.Provider value={{ showToast, errorToast, warningToast, successToast, retryLater }} children={props.children} />
        </>

    )
}

const useToastContext = () => useContext(ToastContext)

export { ToastContext, useToastContext, ToastContextProvider }