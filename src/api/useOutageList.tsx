import { useState } from "react"
import { useMount } from "../hooks/useMount";
import { useApi } from "../contexts/ApiProvider";

type OutageListItem = {
    id: number
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

export {useOutageList}