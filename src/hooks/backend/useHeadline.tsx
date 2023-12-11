import { useApi } from "../../contexts/ApiProvider"
import { useState } from 'react';
import { useMount } from "../custom/useMount";

//TODO: cache data for the session duration

export type HeadlineActionType = {
    href: string,
    label: string
}

export type HeadlineType = {
    type: string,
    title: string,
    description: string,
    actions: Array<HeadlineActionType>
}

const useHeadline = () => {
    const api = useApi()
    const [headline, setHeadline] = useState<HeadlineType>()

    const getHeadline = async (): Promise<HeadlineType> => {
        if (headline === undefined) {
            const response = await api.getHeadline()
            setHeadline(response)
            return response
        } else {
            return headline
        }
    }

    useMount(() => {
        getHeadline()
    })

    return {getHeadline}
}

export { useHeadline }