import { ToBeDefined } from "./common"

export type ballot = {
    id: number
    name: string,
    type: ToBeDefined,
    description: string
}

export type npsPayload = {
    service: boolean,
    recurrence: boolean,
    information: boolean,
    leadtime: boolean,
    other: boolean
}

export type nps = {
    id: number,
    ballotId: number,
    userId: number,
    note: number,
    comment: string,
    payload?: npsPayload
}

export type npsForm = {
    note: number,
    comment: string,
    service?: boolean,
    recurrence?: boolean,
    information?: boolean,
    leadtime?: boolean,
    other?: boolean
}

export type ballotsSegment = {
    note: number,
    votes: number
}

export type npsBallots = {
    segments: ballotsSegment[],
    score: number
}