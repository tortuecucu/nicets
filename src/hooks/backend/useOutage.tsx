import { Outage } from "src/types/outage"

type OutageResponse = [
    Outage | null,
    Error | null
]

const useOutage = () => {

    const getById = async (id: number): Promise<OutageResponse> => {
        return [
            {
                id: id,
                statusId: 1
            },
            null
        ]
    }

    const isEnded = (outage: Outage): boolean => {
        return true //TODO: code it
    }

    return {getById, isEnded}
}

export {useOutage}