import { BackendResponse } from "src/types/api";
import useOutageChildren from "./useOutageChildren";
import { ModelDatetime } from "src/types/model";
import { OutageRecord } from "./useOutage";

interface OutageDetailRecord  {
    id: number,
    outageId: number,
    property: string,
    value: string,
    lang: string
}

interface AddPayload {
    id: never,
    outageId: number,
    property: string,
    value: string,
    lang: string,
    createdAt: ModelDatetime
}

interface UpdatePayload {
    id?: number,
    outageId: number,
    property: string,
    value: string,
    lang: string
}

/**
 * Custom hook for fetching outage detail data.
 */
const useOutageDetail = (outage: OutageRecord) => {
    const api = useOutageChildren<OutageDetailRecord>(
        outage.id,
        {
            get: {
                url: '/api/outage/details/${outageId}'
            },
            add: {
                url: '/api/outage/details/${outageId}'
            },
            update: {
                url: '/api/outage/details/${childId}'
            },
            delete: {
                url: '/api/outage/details/${childId}'
            }
        }
    );

    /**
     * Adds an outage detail record to the specified outage.
     * 
     * @param outageId - The ID of the outage.
     * @param detail - The outage detail record to add.
     * @returns A promise that resolves when the detail record is added successfully.
     */
    const addOutageDetail = async (detail: AddPayload): BackendResponse<OutageDetailRecord> => {
        return api.addOutageChild( detail);
    };

    /**
     * Updates the outage detail record.
     * 
     * @param detail The outage detail record to update.
     * @returns A promise that resolves to a BackendResponse containing the updated outage detail record.
     */
    const updateOutageDetail = async (detail: UpdatePayload): BackendResponse<OutageDetailRecord> => {
        return api.updateOutageChild(detail as OutageDetailRecord);
    };

    /**
     * Deletes an outage detail record.
     * @param detail The outage detail record to delete.
     * @returns A promise that resolves to a BackendResponse<boolean>.
     */
    const deleteOutageDetail = async (detail: OutageDetailRecord): BackendResponse<boolean> => {
        return api.deleteOutageChild(detail);
    };

    const get = (property: string): OutageDetailRecord | undefined => {
        return api.children.find((detail) => detail.property === property);
    }

    return {
        chidren: api.children,
        addOutageDetail,
        updateOutageDetail,
        deleteOutageDetail,
        isLoading: api.isLoading,
        get
    };
};

export default useOutageDetail;
