import { ModelDatetime } from "./common";
import { Outage, OutageStatus } from "./outage";
import { Service } from "./service";

export type Maintenance = Outage & {
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