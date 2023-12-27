import { BackendResponse } from "src/types/api";
import useOutageChildren from "./useOutageChildren";
import { ModelDatetime } from "src/types/model";

type OutageMilestone = {
    id: number,
    outageId: number,
}

interface AddPayload  {
    id: never,
    outageId: number,
    name: string,
    occured: ModelDatetime
}

interface EditPayload  {
    id?: number,
    outageId?: number,
    occured: ModelDatetime
}

interface DeletePayload {
    id: number
}

export type OutageMilestoneRecord = { //'id', 'outageId', 'name', 'label', 'occured', 'milestoneId'],
    id: number,
    outageId: number,
    name: string,
    label: string,
    occured: ModelDatetime,
    milestoneId: number,
    milestone: {
        id: number,
        name: string,
        label: string,
        description: string,
        category: string,
        level: number,
        createEvent: boolean,
    }
}

const useOutageMilestone = (outageId: number) => {
    const api = useOutageChildren<OutageMilestoneRecord>(outageId, {
        get: {
            url: '/api/outage/milestone/${outageId}'
        },
        add: {
            url: '/api/outage/milestone/${outageId}'
        },
        update: {
            url: '/api/outage/milestone/${childId}'
        },
        delete: {
            url: '/api/outage/milestone/${childId}'
        }
    });

    const addOutageMilestone = async ( milestone: AddPayload): BackendResponse<OutageMilestoneRecord> => {
        return api.addOutageChild(milestone as unknown as OutageMilestoneRecord) as BackendResponse<OutageMilestoneRecord>
    };

    const updateOutageMilestone = async (milestone: EditPayload): BackendResponse<OutageMilestoneRecord> => {
        return api.updateOutageChild(milestone as unknown as OutageMilestoneRecord) as BackendResponse<OutageMilestoneRecord>
    };

    const deleteOutageMilestone = async (milestone: DeletePayload): BackendResponse<boolean> => {
        return api.deleteOutageChild(milestone as unknown as OutageMilestoneRecord)
    };

    return {
        milestones: api.children,
        isLoading: api.isLoading,
        addOutageMilestone,
        updateOutageMilestone,
        deleteOutageMilestone,
    };

}

export default useOutageMilestone;
