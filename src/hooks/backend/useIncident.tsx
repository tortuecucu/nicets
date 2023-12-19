import { useApi } from "src/contexts/ApiProvider"
import { BackendResponse } from "src/types/api"
import { IncidentFields } from "src/types/incident"

type IncidentInsert = IncidentFields & {
    id: never,
    outageId: never,
    numerber: string,
    priority: number,
    ttr: string,
    ballotId: never,
    outage: {
        id: never,
        serviceId: number,
        description: string,
        shortDescription: string,
        typeId: number,
        statusId: number,
        startAt: string,
        endAt: string
    }
} 

type IncidentRecord = IncidentFields & {
    id: number,
    outageId: number,
    numerber: string,
    priority: number,
    ttr: string,
    ballotId: never,
    outage: {
        id: number,
        serviceId: number,
        description: string,
        shortDescription: string,
        typeId: number,
        statusId: number,
        startAt: string,
        endAt: string
    }
}

const useIncident = () => {
    const api = useApi()

    const addIncident = (incident: IncidentInsert): BackendResponse<IncidentRecord> => {
        return api.postHandler<IncidentRecord>('/api/incident/new', incident, undefined)
    }

    const updateIncident = (incident: IncidentRecord): BackendResponse<IncidentRecord> => {
        return api.putHandler<IncidentRecord>(`/api/incident/${incident.id}`, incident, undefined)
    }

    const deleteIncident = (incidentId: number): BackendResponse<boolean> => {
        return api.deleteHandler(`/api/incident/${incidentId}`, undefined)
    }

    const getActiveIncidents = (): BackendResponse<IncidentRecord[]> => {
        return api.getHandler<IncidentRecord[]>('/api/incident/active', undefined)
    }

    return {
        addIncident,
        updateIncident,
        deleteIncident,
        getActiveIncidents
    }

}

export default useIncident 