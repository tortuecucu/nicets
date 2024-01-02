import { RelatedPanel, relations, ago, formatDatetime } from "./RelatedPanel"
import { itemFactory } from "../../../components/form/ListEdit"
import "./events.css"
import { Popover, OverlayTrigger } from "react-bootstrap"
import { EventtypeSelect } from "../../components/EventtypeSelect"

const Form = ({ item, control, register }) => {
    return (<>
        <EventtypeSelect id="enventId" control={control} name="eventtypeId" />
    </>)
}

const CompactRenderer = ({ item }) => {
    const itemDetails = (
        <Popover id="details" title="détails de l'événement">
            {item.description}
        </Popover>
    )
    var label = (item.label) ? item.label : undefined
    if (label === undefined) {
        label = (item.eventtype && item.eventtype.label) ? item.eventtype.label : 'événement'
    }
    return (<>
        <OverlayTrigger trigger={['hover', 'focus', 'click']} overlay={itemDetails} placement="bottom">
            <div className="w-100 ms-2 me-1">
                <div className="hstack occured">
                    <span className="fw-lighter text-secondary">{formatDatetime(item.occured)}</span>
                    <span className="ms-2 fw-light text-muted">{ago(item.occured)}</span>
                </div>
                <span className="">{label}</span>
            </div>
        </OverlayTrigger>
    </>)
}

const Events = ({ outage }) => {
    return (
        <RelatedPanel outage={outage} Form={Form} relation={relations.events} compactItem={itemFactory(['p-1', 'event-item'], CompactRenderer)} />
    )
}

export { Events }