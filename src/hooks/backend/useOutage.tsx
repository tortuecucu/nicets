import { BackendResponse } from "src/types/api"
import { ModelDatetime } from "src/types/model"
import { OutageEtaFields } from "src/types/outageeta"
import { useApi } from "src/contexts/ApiProvider"
import { ToBeDefined } from "src/types/common"
import { Parameters, useConfig } from "../config/useConfig"
import useDate from "./useDate"
import { OutageStatusId } from "src/types/outagestatus"

export type OutageRecord = OutageEtaFields & {
    id: number,
    statusId: number,
    typeId: number,
    startAt: ModelDatetime,
    endAt: ModelDatetime,
    description: string,
    shortDescription: string
    etas: Array<{
        earliestEta: ModelDatetime,
        latestEta: ModelDatetime,
        confidence: number
    }>,
    status: {
        label: string,
        name: string
    },
    type: {
        label: string,
        isFailure: boolean
    },
    maintenance?: {
        plannedEnd: boolean
    },
    service: {
        name: string
    }
}


const useOutage = () => {
    const api = useApi()

    const getById = async (id: number): BackendResponse<OutageRecord> => {
        return api.getHandler<OutageRecord>(`/api/outage/${id}`, undefined)
    }

    const getByNumber = async (ref: string): BackendResponse<OutageRecord> => {
        return api.getHandler<OutageRecord>(`/api/outage/incident/${ref}`, undefined)
    }

    const isEnded = (outage: OutageRecord): boolean => {
        const {isPast} = useDate()

        if (outage.endAt && isPast(outage.endAt)) {
            return true
        }

        if (outage.statusId === OutageStatusId.Closed) {
            return true
        }

        return false
    }

    const isValidRef = (ref: string): boolean => {
        ref = ref.toUpperCase().trim();
        const regex = new RegExp(useConfig().get(Parameters.INCT_REGEX) as string);
        return regex.test(ref)
    }

    const getOutageStats = (outageId: number): ToBeDefined => { //NEXT: code it
        return ([{
            'total': 100,
            'segments': [
                {
                    'total': 60,
                    'name': 'yes'
                },
                {
                    'total': 40,
                    'name': 'no'
                }
            ]
        }, null]);
    }

    return { getById, isEnded, getByNumber, isValidRef, getOutageStats }
}

export { useOutage }