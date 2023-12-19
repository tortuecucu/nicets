import { TableFields } from "./model"
import { ModelDatetime } from "./model"

export interface OutageFields extends TableFields {
    statusId?: number,
    serviceId?: number,
    typeId?: number,
    startAt?: ModelDatetime,
    endAt?: ModelDatetime,
    description?: string,
    shortDescription?: string
    ballotId?: number
}
