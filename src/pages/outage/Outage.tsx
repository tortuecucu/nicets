
import { useParams } from "react-router-dom";
import { useResponseContext } from "src/components/puller/DataPuller";
import Incident from "./Incident";
import Prealert from "./Prealert";
import { OutageNotFound } from "../../components/utils/BigMessages";
import { Render, RenderOne } from "src/components/utils/Render";
import { OutageFetcher } from "src/components/outage/OutageFetcher";
import { OutageType } from "src/types/outage";
import { OutageTypes } from "src/types/outagetype";
import { MaintenanceType } from "src/types/maintenance";
import Maintenance  from "./Maintenance";

import "./outage.css"

const ContentSwitch = () => {
    const { data: outage } = useResponseContext<OutageType>()

    return (<>
        <RenderOne fallback={<OutageNotFound />}>
            <RenderOne.Render condition={(outage.typeId === OutageTypes.Prealert)}>
                <Prealert outage={outage} />
            </RenderOne.Render>
            <RenderOne.Render condition={(outage.typeId === OutageTypes.Maintenance)}>
                <Maintenance maintenance={outage as MaintenanceType} />
            </RenderOne.Render>
            <RenderOne.Render condition={([OutageTypes.Incident].includes(outage.typeId))}>
                <Incident outage={outage} />
            </RenderOne.Render>
        </RenderOne>
    </>)
}

const Outage = () => {
    const { id: dirtyId } = useParams();

    let id: number = 0
    if (dirtyId) {
        id = +dirtyId
    }

    return (
        <>
            <Render condition={(id > 0)} fallback={<OutageNotFound />}>
                <OutageFetcher id={id}>
                    <ContentSwitch />
                </OutageFetcher>
            </Render>
        </>
    );
};

export default Outage;