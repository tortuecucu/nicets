import { useApi } from "../contexts/ApiProvider"
import { useState } from 'react';
import { useMount } from "../hooks/useMount";

//TODO: cache data for the session duration

export type HeadlineAction = {
    href: string,
    label: string
}

export type Headline = {
    type: string,
    title: string,
    description: string,
    actions: Array<HeadlineAction>
}

const useHeadline = () => {
    const api = useApi()
    const [headline, setHeadline] = useState<Headline>()

    const getHeadline = (): Promise<Headline> => {
        return api.getHeadline()
    }

    useMount(()=>{
        const fetchHeadline = async () => {
            const data = await getHeadline()
            if (data) {
                setHeadline(data)
            }
        }
        fetchHeadline()
    })

    return { headline, getHeadline }
}

export { useHeadline }