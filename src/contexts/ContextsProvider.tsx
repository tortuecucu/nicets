import { HelpdeskContextProvider } from "./HelpdeskContext"
import { ToastContextProvider } from "./ToastContext"
import ApiProvider from "./ApiProvider"
import { CallHelpdeskModal } from "src/pages/layout/common/CallHelpdeskModal"
import { UserContextProvider } from "./UserContext"

type ContextsProviderProps = {
    children: React.ReactElement
}

const ContextsProvider = (props: ContextsProviderProps) => {
    return (
        <ApiProvider>
            <UserContextProvider>
                <ToastContextProvider>
                    <HelpdeskContextProvider>
                        {props.children}
                    </HelpdeskContextProvider>
                    <CallHelpdeskModal />
                </ToastContextProvider>
            </UserContextProvider>
        </ApiProvider>
    )
}

export { ContextsProvider }