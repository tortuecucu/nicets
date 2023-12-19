import { ToBeDefined } from "./common"
import { TableFields } from "./model"

export enum OutageStatusId {
    Prealert = 1,
    ServiceDisrupted = 2,
    Correcting = 3,
    NominalConfirming = 4,
    Workaround = 5,
    NominalStated = 6,
    Closed = 7
}

export interface OutageStatusFields extends TableFields {
    name: string,
    label: string,
    description: string,
    isFailure: boolean,
    phase: ToBeDefined,
    types: ToBeDefined
}
