import { ModelDatetime } from "./common";
import { OutageType, OutageStatus } from "./outage";
import { Service } from "./service";

export type MaintenanceType = OutageType & {
    maintenance: {
        id: number,
        outageId: number
        plannedStart: ModelDatetime,
        plannedEnd: ModelDatetime,
        changeNumber: string
    },
    service: Service,
    status: OutageStatus
}