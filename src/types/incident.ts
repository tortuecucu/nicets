import { TableFields } from "./model";
import { OutageFields } from "./outage";

export interface IncidentFields extends TableFields {
    outageId?: number
    number?: string,
    priority?: number,
    ttr: string,
    ballotId?: number,
    changeNumber?: string
    outage?: OutageFields
}