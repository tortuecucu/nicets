import { itemFactory } from "../../../components/form/ListEdit"
import { RelatedPanel, relations } from "./RelatedPanel"
import { CheckCircleFill, CheckSquareFill, ExclamationTriangleFill, QuestionCircleFill } from "react-bootstrap-icons"
import { LocationSelect } from "../../components/LocationSelect"
import { RelationSelect } from "../../components/RelationSelect"
import classNames from 'classnames'

const LocationForm = ({ item, control, register }) => {
    return (<>
        <LocationSelect control={control} name="locationId" />
        <RelationSelect control={control} name="relationId" />
    </>)
}

const Renderer = ({ item }) => {
    return (
        <div className={classNames(
            'me-auto',
            { 'text-success': item.relationId === 3 },
            { 'text-danger': item.relationId === 2 },
            { 'text-primary': (item.relationId !== 2 && item.relationId !== 3) },
        )}>
            {item.relationId === 3 && <CheckCircleFill color="var(--bs-success)" className="me-2" />}
            {item.relationId === 2 && <ExclamationTriangleFill color="var(--bs-danger)" className="me-2" />}
            <span>{(item && item.location && item.location.name) ? item.location.name : '...'}</span>
        </div>
    )
}

const CompactSite = ({ item, onDelete, onUpdate}) => {
    const classes = [
        'list-group-item',
        'p-1',
        { 'bg-success-subtle': item.relationId === 3 },
        { 'bg-danger-subtle': item.relationId === 2 },
        { 'bg-light-subtle': (item.relationId !== 2 && item.relationId !== 3) },
    ]
    const Item = itemFactory(classes, Renderer)
    return(
        <Item item={item} onDelete={onDelete} onUpdate={onUpdate} />
    )
}

const Locations = ({ outage }) => {
    return (
        <RelatedPanel outage={outage} Form={LocationForm} relation={relations.locations} compactItem={CompactSite} />
    )
}

export { Locations }