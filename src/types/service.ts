import { ToBeDefined } from "./common"
import { TableFields } from "./model"

export interface ServiceFields extends TableFields  {
    name?: number
    criticity?: 1 | 2 | 3,
    owningCompany?: number
    whereUsed?: ToBeDefined,
    range?: string,
    snName?: string
} 

