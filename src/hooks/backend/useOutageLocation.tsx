import { BackendResponse } from "src/types/api";
import useOutageChildren from "./useOutageChildren";

interface OutageLocation  {
    id: number,
    outageId: number,
}

interface AddPayload {
    id: never,
    outageId: number,
    locationId: number,
    relationId: number,
}

interface EditPayload {
    id: number,
    outageId: number,
    locationId: number,
    relationId: number,
}

interface DeletePayload {
    id: number,
    outageId?: number,
}

interface OutageLocationRecord {
    id: number,
    outageId: number,
    locationId: number,
    relationId: number,
    location: {
        id: number,
        name: string,
        countryCode: string,
        isVirtual: boolean
    }
}

function useOutageLocation(outageId: number) {
    const api = useOutageChildren<OutageLocation>(outageId, {
        get: {
            url: '/api/outage/location/${outageId}/all'
        },
        add: {
            url: '/api/outage/location'
        },
        update: {
            url: '/api/outage/location/${childId}'
        },
        delete: {
            url: '/api/outage/location/${chilId}'
        }
    });

    const addOutageLocation = async ( location: AddPayload): BackendResponse<OutageLocationRecord> => {
        return api.addOutageChild(location) as BackendResponse<OutageLocationRecord>
    };

    const updateOutageLocation = async (location: EditPayload): BackendResponse<OutageLocationRecord> => {
        return api.updateOutageChild(location as OutageLocation) as BackendResponse<OutageLocationRecord>
    };

    const deleteOutageLocation = async (location: DeletePayload): BackendResponse<boolean> => {
        return api.deleteOutageChild(location as OutageLocation)
    };

    return {
        locations: api.children,
        addOutageLocation,
        updateOutageLocation,
        deleteOutageLocation,
    };
}

export default useOutageLocation;