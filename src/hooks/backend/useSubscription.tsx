import { BackendResponse } from "src/types/api"
import { useApi } from "src/contexts/ApiProvider"

const useSubscription = () => {
    const { postHandler, deleteHandler } = useApi()
  
    const subscribe = async (outageId: number): BackendResponse<boolean> => {
        const endpoint = '/api/outage/subscribe/' + outageId
        const [response, err] = await postHandler(endpoint, {
            outageid: outageId
        }, undefined)

        if (err) {
            return [null, err]
        }

        return [(response !== null), null]
    }

    const unsubscribe = async (outageId: number): BackendResponse<boolean> => {
        const endpoint = '/api/outage/subscribe/' + outageId
        return deleteHandler(endpoint, undefined) 
    }

    const manage = async (outageId: number, optIn: boolean): BackendResponse<boolean> => {
        if (optIn) {
            return subscribe(outageId)
        } else {
            return unsubscribe(outageId)
        }
    }

    return { manage }
}

export { useSubscription }