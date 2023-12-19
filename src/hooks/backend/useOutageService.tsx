import useOutageChildren from "./useOutageChildren";
import { BackendResponse } from "src/types/api";

interface OutageService  {
    id: number,
    outageId: number,
    serviceId: number,
    relationId: number,
}

type AddPayload = {
    id: never,
    outageId: number,
    serviceId: number,
    relationId: number,
}

type UpdatePayload = {
    id: number,
    outageId: number,
    serviceId: number,
    relationId: number,
}

type OutageServiceRecord = {
    id: number,
    outageId: number,
    serviceId: number,
    relationId: number,
    relation: {
        name: string,
        label: string,
        description: string
    },
    service: {
        id: number,
        name: string
    }
}


const useOutageService = (outageId: number) => {
    const api = useOutageChildren<OutageService>(outageId, {
        get: {
            url: '/api/outage/services/${outageId}/all'
        },
        add: {
            url: '/api/outage/services'
        },
        update: {
            url: '/api/outage/services/${childId}'
        },
        delete: {
            url: '/api/outage/services/${childId}'
        }
    })

    const addOutageService = async (service: AddPayload): BackendResponse<OutageServiceRecord> => {
        return api.addOutageChild(service) as BackendResponse<OutageServiceRecord>
    }

    const updateOutageService = async (service: UpdatePayload): BackendResponse<OutageServiceRecord> => {
        return api.updateOutageChild(service) as BackendResponse<OutageServiceRecord>
    }

    const deleteOutageService = async (service: OutageService): BackendResponse<boolean> => {
        return api.deleteOutageChild(service)
    }

    return {
        addOutageService,
        updateOutageService,
        deleteOutageService,
        children: api.children,
    }
        
}

export default useOutageService

