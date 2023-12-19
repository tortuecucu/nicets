import { ModelDatetime, TableFields } from "./model";
import { OutageFields } from "./outage";

export interface MaintenanceFields extends TableFields {  
    outageId?: number
    plannedStart?: ModelDatetime,
    plannedEnd?: ModelDatetime,
    changeNumber?: string,
    outage?: OutageFields
 }