
import { useApi } from "src/contexts/ApiProvider"
import { useArray } from "src/hooks/custom/useArray"
import { OutageStatusFields, OutageStatusId } from "src/types/outagestatus"
import { useMount } from "src/hooks/custom/useMount"

type OutageStatus = OutageStatusFields & {
    id: OutageStatusId,
    name: string,
    label: string,
}

const useOutageStatus = () => {
    const { array, find, set } = useArray<OutageStatus>([]) //NEXT: use local cache

    const fetchStatuses = async () => {
        const { getHandler } = useApi()
        const [response, _] = await getHandler<OutageStatus[]>('/api/outage/status/all', undefined)
        if (response) {
            set(response)
        }
    }

    useMount(() => {
        fetchStatuses()
    })

    const getStatus = (id: OutageStatusId): OutageStatus | undefined => {
        return find((status: any) => status.id === id)
    }

    const getStatusString = (id: OutageStatusId, field: 'name' | 'label') => {
        const status = getStatus(id) as OutageStatus
        if (status && field === 'name') {
            return status.name
        }
        return status.label
    }

    return {
        statuses: array,
        getStatusString,
        getStatus
    }
}

export { useOutageStatus }