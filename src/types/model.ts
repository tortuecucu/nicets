export interface hasId {
    id: number
}

export interface TableFields {
    id?: number,
    createdAt?: ModelDatetime,
    updatedAt?: ModelDatetime,
    deletedAt?: ModelDatetime
}

export interface sequelizeCore extends hasId {
    id: number,
    createdAt: ModelDatetime,
    updatedAt: ModelDatetime
}

export interface sequelizeParanoid extends sequelizeCore {
    deletedAt: ModelDatetime
}

export type ModelDatetime = string 