import { RelatedPanel, relations, ago, formatDatetime } from "./RelatedPanel"
import { itemFactory } from "../../../components/form/ListEdit"
import "./milestone.css"
import { MilestoneSelect } from "../../components/MilestoneSelect"
import { WrappedDatetime } from "../../components/DateTime"

const InnerForm = ({ item, control, register }) => {
    return (<>
        <MilestoneSelect control={control} name='milestoneId' id='milestone' />
        <WrappedDatetime id='occured' className='pb-3' label="Moment" text='Date & heure du jalon' control={control} name='occured'/>
    </>)
}

const CompactRenderer = ({ item }) => {
    return (<>
        <div className="w-100 ms-2 me-1">
            <div className="hstack occured">
                <span className="fw-lighter text-secondary">{formatDatetime(item.occured)}</span>
                <span className="ms-2 fw-light text-muted">{ago(item.occured)}</span>
            </div>
            <span className="">{item.milestone.label}</span>
        </div>
    </>)
}

const MileStones = ({ outage }) => {
    return (
        <RelatedPanel outage={outage} relation={relations.milestones} Form={InnerForm} compactItem={itemFactory(['p-1', 'milestone-item'], CompactRenderer)} />
    )
}

export { MileStones }