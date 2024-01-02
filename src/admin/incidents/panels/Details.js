import { RelatedPanel, relations } from "./RelatedPanel"
import { itemFactory } from "../../../components/form/ListEdit"
import { Wrapper, WrappedInput } from "../../components/Wrapper"

const DetailForm = ({ item, control, register }) => {
    return (<>
        <WrappedInput id='property' label='Propriété' text='nom de la propriété' inputProps={{
            placeholder: 'valeur', ...register("property", { required: true })
        }} />
        <WrappedInput id='value' className='pb-3' label="Valeur" text='valeur de la propriété' inputProps={{
            placeholder:"valeur", ...register("value", { required: true })
        }} />
    </>)
}

const CompactRenderer = ({ item }) => {
    return (<>
        <span className="ms-2 me-1 fw-light">{item.property}:</span>
        <span className="me-auto">{item.value}</span>
    </>)
}

const Details = ({ outage }) => {

    const newItem = (e) => {
        console.log(e)
        return {
            id: null,
            
        }
    }

    return (
        <RelatedPanel outage={outage} Form={DetailForm} relation={relations.details} compactItem={itemFactory(['p-1'], CompactRenderer)} newitemFactory={newItem}/>
    )
}

export { Details }