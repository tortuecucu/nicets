export enum OutageTypes {
    Incident = 1,
    Prealert = 2,
    Maintenance = 3,
    Slowness = 4,
    FeatureLoss = 5
}

export interface OutageType {
    id: number,
    name: string,
    label: string,
    description: string,
    isFailure: boolean
}