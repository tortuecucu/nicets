import { BackendResponse } from "src/types/common"
import { OutageType } from "src/types/outage"

type OutageResponse = [
    OutageType | null,
    Error | null
]

const useOutage = () => {

    const getById = async (id: number): BackendResponse<OutageType> => {
        return [
            {
                id: id,
                statusId: 1
            },
            null
        ]
    }

    const getByNumber = async (ref: string): BackendResponse<OutageType> => {
        return getById(3)
    }

    const isEnded = (outage: OutageType): boolean => {
        return true //TODO: code it
    }

    const isValidRef = (ref: string): boolean => {
        return true //TODO: code it
        /**
         * const config = useConfig()
            reference = String(reference).toUpperCase().trim();
            const regex = new RegExp(config.get(Parameters.INCT_REGEX));
            if (regex.test(reference)) {
                const [outage, err] = await getOutage(reference);
                if (err) {
                    console.error(err);
                } else {
                    setOutage(outage);
                }                
            }
         * 
         */
    }

    const getOutageId = async (ref: string): BackendResponse<number> => {
        return [1, null]
    }

    return {getById, isEnded, getByNumber, isValidRef, getOutageId}
}

export {useOutage}