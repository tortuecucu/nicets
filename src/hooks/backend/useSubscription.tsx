import { BackendBooleanResponse } from "src/types/common"
import { useBackend } from "./useBackend"

const useSubscription = () => {
    const { postHandler, deleteHandler } = useBackend()
  
    const subscribe = async (outageId: number): BackendBooleanResponse => {
        const endpoint = '/api/outage/subscribe/' + outageId
        return postHandler(endpoint, {
            outageid: outageId
        }) as BackendBooleanResponse
    }

    const unsubscribe = async (outageId: number): BackendBooleanResponse => {
        const endpoint = '/api/outage/subscribe/' + outageId
        return deleteHandler(endpoint) as BackendBooleanResponse
    }

    const manage = async (outageId: number, optIn: boolean): BackendBooleanResponse => {
        if (optIn) {
            return subscribe(outageId)
        } else {
            return unsubscribe(outageId)
        }
    }

    return { manage }
}

export { useSubscription }