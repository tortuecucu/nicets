import { ToBeDefined } from "./common"

export type Service = {
    name: string,
    criticity: number,
    owningCompany: number,
    whereUsed: ToBeDefined,
    range: string,
    snName: string
}