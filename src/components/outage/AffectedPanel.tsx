import { OutageRecord } from "src/hooks/backend/useOutage";
import { ActionPanel } from "./ActionPanel";
import { SitesAffected } from "./SitesAffected";

import Tornado from "../data/Tornado";
import tornadoData from '../../assets/data/tornado.json';
import LOCATIONS from "../../assets/data/locations";

type AffectedPanelProps = {
    outage: OutageRecord
}

const AffectedPanel = (props: AffectedPanelProps) => {

    return (
        <div className="my-3 p-4 bg-body rounded shadow-sm">
            <div className="hstack mb-4">
                <h4 className="">Impact déclaré par les utilisateurs</h4>
                <span className="badge text-bg-danger ms-auto">120 utilisateurs affectés</span>
            </div>
            <h6 className="mt-4">Description du dysfonctionnement</h6>
            <p className="lead mb-2 fs-5 ms-3">{props.outage.description}</p>
            <h6 className="mt-4 mb-3">Sites affectés</h6>
            <SitesAffected outage={props.outage} sites={LOCATIONS} />
            <h6 className="mt-4 mb-3">Retours des utilisateurs</h6>
            <Tornado data={tornadoData} title={""} value="count" dimensions={['result', 'site', 'connection']} leftValue="yes" />
            <hr className="hr" />
            <div className="hstack">
                <ActionPanel outage={props.outage} compact={true} className={'ms-auto'} />
            </div>
        </div>
    )
};

export {AffectedPanel}