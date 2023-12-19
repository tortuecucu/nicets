
import { OutageType, OutageTypeId } from "src/types/outagetype"
import { useArray } from "../custom/useArray"
import { useApi } from "src/contexts/ApiProvider"    
import { useMount } from "../custom/useMount"

const useOutageType = () => {
    const {array, find, set} = useArray<OutageType>([]) //NEXT: use local cache

    const fetchTypes = async () => {
        const {getHandler} = useApi()
        const [response, _] = await getHandler<OutageType[]>('/api/outage/types/all', undefined)
        if (response) {
            set (response)
        }
    }

    useMount(() => {
        fetchTypes()
    })

    const getOutageType = (id: OutageTypeId): OutageType  => {
        return find((type: OutageType) => type.id === id) as OutageType
    }

    const getOutageTypeString = (id: OutageTypeId, field: 'name' | 'label'): string => {
        const type = getOutageType(id) as OutageType
        if (type && field === 'name') {
            return type.name
        } 
        return type.label
    }

    return {
        types: array,
        getOutageTypeString
    }

}

export default useOutageType