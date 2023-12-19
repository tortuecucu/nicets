import { useApi } from "src/contexts/ApiProvider"
import { BackendResponse } from "src/types/api"
import { ToBeDefined } from "src/types/common"

type UserContext = ToBeDefined

const useUserContext = () => {
    const api = useApi()
    //TODO: get sites
    //TODO: get ssid
    //TODO: post context

    const postContext = async (outageId: number, payload: UserContext): BackendResponse<boolean> => {
        const [_, err] = await api.postHandler('/api/outage/context/' + outageId, payload, undefined)
        if (err) {
            return [null, err]
        }
        return [true, null]
    }

    return {postContext}

}

export {useUserContext}
