import { ModelDatetime } from "./model"
import { OutageEta } from "./outageeta"
import { OutageStatusId } from "./outagestatus"
import { OutageTypeId } from "./outagetype"

export type OutageListItem = {
    id: number
    etas: Array<OutageEta>
    status: {
        label: string,
        name: string
    },
    typeId: OutageTypeId,
    statusId: OutageStatusId,
    shortDescription: string,
    type: {
        label: string,
        isFailure: boolean
    },
    startAt: ModelDatetime,
    endAt: ModelDatetime
    maintenance?: {
        plannedAt: ModelDatetime
    },
    service?: {
        name: string
    }
}