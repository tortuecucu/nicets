import { ModelDatetime, ToBeDefined } from "./common"

export type OutageType = {
    id: number,
    statusId: number,
    serviceId: number,
    typeId: number,
    startAt: ModelDatetime,
    endAt: ModelDatetime,
    description: string,
    shortDescription: string
}

export type OutageStatus = {
    id: number,
    name: string,
    label: string,
    phase: ToBeDefined,
    description: string,
    types: ToBeDefined
}