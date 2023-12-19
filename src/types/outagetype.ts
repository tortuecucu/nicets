import { TableFields } from "./model";

export enum OutageTypeId {
    Incident = 1,
    Prealert = 2,
    Maintenance = 3,
    Slowness = 4,
    FeatureLoss = 5
}

export interface OutageTypeFields extends TableFields {
    name?: string,
    label?: string,
    description?: string,
    isFailure?: boolean
}

export type OutageType = OutageTypeFields & {
    id: number,
    name: string,
    label: string,
    isFailure: boolean
}