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


    /**
     * Retrieves the headline from the backend.
     * @returns A promise that resolves to a HeadlineType object, or undefined if the headline is not found.
     */
    const getHeadline = async (): Promise<HeadlineType | undefined> => {
        if (headline === undefined) {
            const [response, err] = await api.getHandler<HeadlineType>('/api/home/headline', undefined);
            if (err) {
                console.error(err)
                return undefined
            } else if (response) {
                setHeadline(response)
            return response
            }
            return undefined
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


