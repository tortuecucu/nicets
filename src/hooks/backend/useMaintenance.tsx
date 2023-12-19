import { useApi } from "src/contexts/ApiProvider"
import { BackendResponse } from "src/types/api"
import { MaintenanceFields } from "src/types/maintenance"
import { OutageFields } from "src/types/outage"

type MaintenanceRecord = MaintenanceFields & { 
    id: number,
    outageId: {
        id: never
    }
}

type MaintenanceInput = MaintenanceFields & { 
    id: never,
    outageId: never,
    outage: OutageFields
}

/**
 * Custom hook for handling maintenance related features.
 * 
 * @returns {Object} The maintenance state and functions to update it.
 */

const useMaintenance = () => {
    
    const {getHandler, postHandler, putHandler, deleteHandler} = useApi()

    /**
     * Retrieves the active maintenances from the backend.
     * @returns A promise that resolves to a BackendResponse containing an array of Maintenance objects.
     */
    const getActiveMaintenances = async (): BackendResponse<Array<MaintenanceRecord>> => {
        const [data, err] = await getHandler<Array<MaintenanceRecord>>('/api/maintenance/active', undefined)

        if (err) {
            return [null, err]
        }

        return [data, null]
    }

    /**
     * Adds a maintenance record to the backend.
     * @param payload The maintenance data to be added.
     * @returns A promise that resolves to the added maintenance record.
     */
    const addMaintenance = async (payload: MaintenanceInput): BackendResponse<MaintenanceRecord> => {
        const [data, err] =  await postHandler<MaintenanceRecord>('/api/maintenance/new', payload, undefined)

        if (err || data === null) {
            return [null, err]
        }

        return [data, null]
    }

    /**
     * Updates the maintenance record.
     * @param maintenance The maintenance record to be updated.
     * @returns A promise that resolves to the updated maintenance record.
     */
    const updateMaintenance = async (maintenance: MaintenanceRecord): BackendResponse<MaintenanceRecord> => {
        const [data, err] = await putHandler<MaintenanceRecord>(`api/maintenance/${maintenance.id}`, maintenance, undefined)
        
        if (err) {
            return [null, err]
        }

        return [data, err]
    }

    /**
     * Deletes a maintenance record.
     * @param maintenance - The maintenance record to be deleted.
     * @returns A promise that resolves to a BackendResponse<boolean>.
     */
    const deleteMaintenance = async (maintenance: MaintenanceRecord): BackendResponse<boolean> => {
        const [success, err] = await deleteHandler(`api/maintenance/${maintenance.id}`, undefined)

        if (err) {
            return [null, err]
        }

        return [success, null]
    }

    return {getActiveMaintenances, addMaintenance, updateMaintenance, deleteMaintenance}
}


export default useMaintenance
