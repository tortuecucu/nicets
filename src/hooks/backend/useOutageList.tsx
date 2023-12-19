import { useState, createContext } from "react"
import { useMount } from "../custom/useMount";
import { useApi } from "../../contexts/ApiProvider";
import { ChildrenProp } from "src/types/common";
import { OutageListItem } from "src/types/outagelist";
import { useArray } from "../custom/useArray";

type OutageListContextContent = {
    outages: Array<OutageListItem>
}

const OutageListContext = createContext<OutageListContextContent>({
    outages: []
})

type OutageListContextProviderProps = {
    children: ChildrenProp
}

/**
 * Provides the context for managing the outage list.
 *
 * @param props - The props for the OutageListContextProvider.
 */
const OutageListContextProvider = (props: OutageListContextProviderProps) => {
    return (
        <OutageListContext.Provider value={{
            outages: []
        }} children={props.children} />
    )
}

/**
 * Custom hook for fetching and managing a list of outages.
 *
 * @returns An object containing the necessary functions and data for managing the outage list.
 */
const useOutageList = () => {
    const api = useApi()
    const {array: outages, set} = useArray<OutageListItem>([]) 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * Fetches the list of outages.
     * @returns {Promise<void>} A promise that resolves when the list is fetched.
     */
    async function fetchList() {
        setIsLoading(true)
        const [data, err] = await api.getHandler<Array<OutageListItem>>(`/api/outage/list`, undefined);
        if (err || data === null) {
            throw err
        }
        set(data)
        setIsLoading(false)
    }

    useMount(() => {
        fetchList();
    })

    return { outages, isLoading }
}

export { useOutageList, OutageListContext, OutageListContextProvider }
