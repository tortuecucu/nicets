import React, { useState, createContext, useContext } from "react"
import { useMount } from "../custom/useMount";
import { useApi } from "../../contexts/ApiProvider";

export type OutageListItem = {
    id: number
    etas: Array<Eta>
    status: Status,
    typeId: number,
    statusId: number,
    shortDescription: string,
    type: OutageType,
    startAt: any,
    endAt: any
    maintenance?: Maintenance,
    serviceId: number,
    service?: Service
}

export type Eta = {
    earliestEta: any,
    latestEta: any,
    confidence: number
}

type Status = {
    id: number
    name: string
    label: string
}

type Service = {
    id: number,
    name: string
}

type OutageType = {
    id: number,
    label: string,
    isFailure: boolean
}

type Maintenance = {
    id: number,
    outageId: number
}

type OutageListContextContent = {
    outages: Array<OutageListItem>
}

const OutageListContext = createContext<OutageListContextContent>({
    outages: []
})

type OutageListContextProviderProps = {
    children: React.ReactNode
}

const OutageListContextProvider = (props: OutageListContextProviderProps) => {
    return(
        <OutageListContext.Provider value={{
            outages: []
        }} children={props.children} />
    )
}

const useOutageList = () => {
    const api = useApi()
    const [outages, setOutages] = useState<Array<OutageListItem>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useMount(()=> {
        async function fetchData() {
            setIsLoading(true)
            const [data, err] = await api.getOutages();
            setIsLoading(false)
            if (err) {
                console.error(err);
            } else {
                setOutages(data);
            }
        }
        fetchData();
    })

    return {outages, isLoading}
}

export {useOutageList, OutageListContext, OutageListContextProvider}