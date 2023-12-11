import { useState, useContext, createContext } from 'react';
import { ChildrenProp } from 'src/types/common';

export type HelpdeskContextContent = {
    showModal: boolean,
    setShowModal: (value: boolean) => void
}

const HelpdeskContext = createContext<HelpdeskContextContent>({
    showModal: false,
    setShowModal: () => {}
});

type HelpdeskContextProviderProps = {
    children: ChildrenProp
}

const HelpdeskContextProvider = (props: HelpdeskContextProviderProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    return(
        <HelpdeskContext.Provider value={{showModal, setShowModal}} children={props.children} />
    )
}

const useHelpdeskContext = () => useContext(HelpdeskContext)

export {HelpdeskContext, HelpdeskContextProvider, useHelpdeskContext}