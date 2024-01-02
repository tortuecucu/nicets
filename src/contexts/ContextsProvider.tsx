import { HelpdeskContextProvider } from "./HelpdeskContext"
import { ToastContextProvider } from "./ToastContext"
import ApiProvider from "./ApiProvider"
import { CallHelpdeskModal } from "src/pages/layout/common/CallHelpdeskModal"

type ContextsProviderProps = {
    children: React.ReactElement
}

const ContextsProvider = (props: ContextsProviderProps) => {
    return (
        <ApiProvider>
            <ToastContextProvider>
                <HelpdeskContextProvider>
                    {props.children}
                </HelpdeskContextProvider>
                <CallHelpdeskModal />
            </ToastContextProvider>
        </ApiProvider>
    )
}

export { ContextsProvider }