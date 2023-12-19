import { BackendResponse } from "src/types/api";
import useOutageChildren from "./useOutageChildren";
import { useApi } from "src/contexts/ApiProvider";
import { sequelizeParanoid } from "src/types/model";

type OutageEvent = {
    id: number,
    outageId: number,
}

type OutageEventType = {
    id: number,
    name: string,
    label: string,
    description?: string,
    category: any,
    subcategory: any,
    level: number
}
interface AddPayload {
    id: never,
    outageId: number,
    label: string,
    typeId: number,
    description: string,
    payload?: string
}
interface DelePayload {
    id: number,
    outageId?: number,
}
interface OutageEventRecord extends sequelizeParanoid {
    label: string,
    description: string,
    outageId: number,
    payload?: string,
    eventtypeId: number,
}


const useOutageEvent = (outageId: number) => {
    const api = useOutageChildren<OutageEvent>(outageId, {
        get: {
            url: '/api/outage/${outageId}/events'
        },
        add: {
            url: '/api/outage/event/${outageId}'
        },
        update: {
            url: '/api/outage/event/${childId}`'
        },
        delete: {
            url: '/api/outage/event/${childId}'
        }
    });

    const addOutageEvent = async (event: AddPayload): BackendResponse<OutageEventRecord> => {
        return api.addOutageChild(event) as BackendResponse<OutageEventRecord>
    };

    const updateOutageEvent = async (event: OutageEvent): BackendResponse<OutageEventRecord> => {
        return api.updateOutageChild(event) as BackendResponse<OutageEventRecord>
    };

    const deleteOutageEvent = async (event: DelePayload): BackendResponse<boolean> => {
        return api.deleteOutageChild(event as OutageEvent)
    };

    const getEventTypes = async (): BackendResponse<OutageEventType[]> => {
        const { getHandler } = useApi()
        return await getHandler<OutageEventType[]>('/api/events/all', undefined)
    }

    return {
        events: api.children,
        addOutageEvent,
        updateOutageEvent,
        deleteOutageEvent,
        getEventTypes
    };
};

export default useOutageEvent;
