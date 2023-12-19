import { BackendResponse } from "src/types/api"
import useOutageChildren from "./useOutageChildren"
import { sequelizeParanoid } from "src/types/model"

interface OutageEtaRecord extends sequelizeParanoid  { 
    outageId: number,
    latestEta: any,
    earliestEta: any,
    confidence: number
}

interface AddPayload {
    id: never,
    outageId: number,
    latestEta: any,
    earliestEta: any,
    confidence: number
}

/**
 * Custom hook for retrieving outage ETA information.
 */
const useOutageEta = (outageId: number) => {
    const api = useOutageChildren<OutageEtaRecord>(outageId, {
        get: {
            url: `/api/outage/eta/${outageId}`
        },
        add: {
            url: `/api/outage/eta/${outageId}`
        }
    })


    /**
     * Adds an outage ETA record for a specific outage.
     * 
     * @param outageId - The ID of the outage.
     * @param eta - The ETA record to be added.
     * @returns A promise that resolves to the added ETA record.
     */
    const addOutageEta = async (eta: AddPayload): BackendResponse<OutageEtaRecord> => {
        if (eta.id) {
            return [null, new Error('Cannot add an ETA that was previously saved')]
        }
        if (!eta.latestEta) { //if no latest ETA, then set it to the earliest ETA
            eta.latestEta = eta.earliestEta
        }
 
        return api.addOutageChild(eta as unknown as OutageEtaRecord)
    }

    return {etas: api.children, addOutageEta}
}

export {useOutageEta}