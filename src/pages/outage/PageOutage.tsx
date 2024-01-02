
import { useParams } from "react-router-dom";
import { useResponseContext } from "src/components/puller/DataPuller";
import Incident from "./Incident";
import Prealert from "./Prealert";
import { OutageNotFound } from "../../components/utils/BigMessages";
import { Render, RenderOne } from "src/components/utils/Render";
import { OutageFetcher } from "src/components/outage/OutageFetcher";
import Maintenance  from "./Maintenance";

import { OutageFields } from "src/types/outage";
import { OutageTypeId } from "src/types/outagetype";
import { MaintenanceFields } from "src/types/maintenance";

import "./outage.css"

const ContentSwitch = () => {
    const { data: outage } = useResponseContext<OutageFields>()

    return (<>
        <RenderOne fallback={<OutageNotFound />}>
            <RenderOne.Render condition={(outage.typeId === OutageTypeId.Prealert)}>
                <Prealert outage={outage} />
            </RenderOne.Render>
            <RenderOne.Render condition={(outage.typeId === OutageTypeId.Maintenance)}>
                <Maintenance maintenance={outage as MaintenanceFields} />
            </RenderOne.Render>
            <RenderOne.Render condition={(outage.typeId === OutageTypeId.Incident || outage.typeId === OutageTypeId.FeatureLoss || outage.typeId === OutageTypeId.Slowness)}>
                <Incident outage={outage} />
            </RenderOne.Render>
        </RenderOne>
    </>)
}

const PageOutage = () => {
    const { id: dirtyId } = useParams();

    let id: number = 0

    if (dirtyId && !isNaN(+dirtyId)) {
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

export default PageOutage;