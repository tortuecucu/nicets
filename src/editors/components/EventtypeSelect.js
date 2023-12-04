import { WrappedApiSelect } from "./WrappedApiSelect"

const EventtypeSelect = ({ control, name, id, layout, className}) => {
    const mapper = (item) => {
        return {
            value: item.id,
            label: item.name
        }
    }
    return(
        <WrappedApiSelect label='type' control={control} name={name} id={id} layout={layout} className={className} datamapper={mapper} apiFunction='getEventTypes'/>
    )
}

export {EventtypeSelect}