import { BackendResponse } from "src/types/api"
import { ToBeDefined } from "src/types/common"


type OutageRecord  = { //TODO: add other fields
    id: number,
}

const useImpact = () => {
    const escalate = async (outage: OutageRecord, data: ToBeDefined): BackendResponse<boolean> => {
        return [true, null]
    }

    return {escalate}
}

export {useImpact}