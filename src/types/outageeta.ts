import { ModelDatetime, TableFields } from "./model"

export interface OutageEtaFields extends TableFields {
    outageId?: number
    earliestEta?: ModelDatetime,
    latestEta?: ModelDatetime,
    confidence?: number
}

export type OutageEta = {
    earliestEta: any,
    latestEta: any,
    confidence: number
}