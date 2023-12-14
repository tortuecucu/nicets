import { BackendBooleanResponse, ToBeDefined } from "src/types/common"
import { OutageType } from "src/types/outage"

const useImpact = () => {
    const escalate = async (outage: OutageType, data: ToBeDefined): BackendBooleanResponse => {
        return [true, null]
    }

    return {escalate}
}

export {useImpact}