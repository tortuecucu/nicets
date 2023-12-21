import { OutageRecord } from "src/hooks/backend/useOutage";
import { CheckLg, Dash, GearFill } from 'react-bootstrap-icons';
import { OutageStatusId } from "src/types/outagestatus";
import { RenderOne } from "../utils/Render";

type TrackerItem = {
    label: string,
    statusId: OutageStatusId,
    progress: number,
    milestone: string
}

const ITEMS: TrackerItem[] = [
    {
        label: 'Détection',
        statusId: OutageStatusId.Prealert,
        progress: 0,
        milestone: 'detected'
    },
    {
        label: 'Caractérisation',
        statusId: OutageStatusId.ServiceDisrupted,
        progress: 25,
        milestone: ''
    },
    {
        label: 'Correction',
        statusId: OutageStatusId.Correcting,
        progress: 50,
        milestone: ''
    },
    {
        label: 'Vérification',
        statusId: OutageStatusId.NominalConfirming,
        progress: 75,
        milestone: ''
    },
    {
        label: 'Finalisation',
        statusId: OutageStatusId.NominalStated,
        progress: 100,
        milestone: ''
    }
];


const ItemCaptions = (item: TrackerItem, index: number) => {
    return (<>
        <div key={item.progress} className={`step-desc step-${index + 1} position-absolute`}>
            <p className="my-0 name">{item.label}</p>
            <p className="my-0 occured">09:25</p>
        </div>
    </>)
}

const ItemBadge = (item: TrackerItem, index: number, activeIndex: number) => {

    const Badge = (props: { tag: string, icon: React.ReactElement }) => {
        return (
            <div key={item.progress} className={`step step-${index + 1} ${props.tag} position-absolute start-${item.progress} translate-middle rounded-pill`}>
                {props.icon}
            </div>
        )
    }

    return (
        <RenderOne>
            <RenderOne.Render condition={(item.statusId === activeIndex)}>
                <Badge tag="active" icon={<GearFill className="rotate" />} />
            </RenderOne.Render>
            <RenderOne.Render condition={(item.statusId > activeIndex)}>
                <Badge tag="" icon={<Dash />} />
            </RenderOne.Render>
            <RenderOne.Render condition={(item.statusId < activeIndex)}>
                <Badge tag="done" icon={<CheckLg />} />
            </RenderOne.Render>
        </RenderOne>
    )
}

type TrackerProps = {
    outage: OutageRecord
}

const Tracker = (props: TrackerProps) => {
    const progress = ITEMS.find(item => item.statusId === props.outage.statusId)?.progress.toString() || '0' + '%';

    return (
        <div className="mx-3 stepper bg-body my-3">
            <div className="inner position-relative ms-0 me-0">
                <div className="progress" role="progressbar" style={{ height: '8px' }}>
                    <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{ width: progress }}></div>
                </div>
                {ITEMS.map((item, index) => ItemBadge(item, index, props.outage.statusId))}
            </div>
            <div className="sub position-relative mt-3 mb-5">
                {ITEMS.map((item, index) => ItemCaptions(item, index))}
            </div>
        </div>
    );
};

export { Tracker }