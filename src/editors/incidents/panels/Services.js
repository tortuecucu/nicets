import { RelatedPanel, relations } from "./RelatedPanel"
import { itemFactory } from "../../../components/form/ListEdit"
import classNames from 'classnames'
import { CheckCircleFill, CheckSquareFill, ExclamationTriangleFill, QuestionCircleFill } from "react-bootstrap-icons"
import { RelationSelect } from "../../components/RelationSelect"
import { WrappedService } from "../../components/Service"

const ServiceForm = ({ item, control, register }) => {
    return (<>
        <WrappedService id="service" name="serviceId" control={control} />
        <RelationSelect control={control} name="relationId" />
    </>)
}

const Renderer = ({ item }) => {
    return (
        <div className={classNames(
            'me-auto',
            { 'text-success': item.relationId === 3 },
            { 'text-danger': item.relationId === 4 },
            { 'text-primary': (item.relationId !== 2 && item.relationId !== 3) },
        )}>
            {item.relationId === 3 && <CheckCircleFill color="var(--bs-success)" className="me-2" />}
            {item.relationId === 4 && <ExclamationTriangleFill color="var(--bs-danger)" className="me-2" />}

            <span>{(item && item.service && item.service.name) ? item.service.name : '...'}</span>
            <span className="text-secondary ms-2">{(item.relation && item.relation.label) ? item.relation.label : ''}</span>
        </div>
    )
}

const Item = ({ item, onDelete, onUpdate }) => {
    const classes = [
        'list-group-item',
        'p-1',
        { 'bg-success-subtle': item.relationId === 3 },
        { 'bg-danger-subtle': item.relationId === 4 },
        { 'bg-light-subtle': (item.relationId !== 2 && item.relationId !== 3) },
    ]
    const Item = itemFactory(classes, Renderer)
    return (
        <Item item={item} onDelete={onDelete} onUpdate={onUpdate} />
    )
}

const Services = ({ outage }) => {
    return (
        <RelatedPanel outage={outage} Form={ServiceForm} relation={relations.services} compactItem={Item} />
    )
}

export { Services }