import { RelatedPanel, relations, ago, formatDatetime } from "./RelatedPanel"
import classNames from 'classnames'
import { Wrapper, WrappedInput } from "../../components/Wrapper"
import { DateTime, WrappedDatetime } from "../../components/DateTime"
import dayjs from "dayjs"

const EtaForm = ({ item, control, register }) => { 
    return (<>
        <WrappedDatetime control={control} name='earliestEta' id='eta' label='Cible de résolution' text='Date & heure à laquelle le service devrait être résolu' />
        <WrappedInput id='confidence' className='pb-3' label="Indice de confiance" text='Confiance dans la tenue de la date prévisionnelle' inputProps={{
            type: 'number',
            min: 0,
            max: 100,
            step: 10,
            placeholder: 100,
            ...register("confidence", { required: true })
        }} />
    </>)
}

const CompactRenderer = ({ item }) => {
    return (
        <div className={classNames(
            'me-auto',
            { 'text-white': dayjs(item.earliestEta).isBefore(dayjs()) }
        )}>
            <div className="hstack">
                <span className="ms-2 fw-medium">{formatDatetime(item.earliestEta)}</span>
                <span className="mx-1">-</span>
                <span className="">{item.confidence}%</span>
                <span className="ms-auto me-1 fw-light">{ago(item.earliestEta)}</span>
            </div>
        </div>
    )
}

const CompactEta = ({ item, onDelete, onUpdate }) => {
    return (
        <li className={classNames(
            'list-group-item',
            'p-1',
            { 'bg-danger': dayjs(item.earliestEta).isBefore(dayjs()) }
        )}>
            <CompactRenderer item={item} />
        </li>
    )
}

const Etas = ({ outage }) => {
    return (
        <RelatedPanel outage={outage} Form={EtaForm} relation={relations.etas} compactItem={CompactEta} />
    )
}

export { Etas }