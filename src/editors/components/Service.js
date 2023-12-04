import { WrappedApiSelect } from "./WrappedApiSelect";

const WrappedService = ({  control, name, id, layout, className }) => {
    const mapper = (item) => {
        return {
            value: item.id,
            label: item.name
        }
    }
    return(
        <WrappedApiSelect label='Service' control={control} name={name} id={id} layout={layout} className={className} datamapper={mapper} apiFunction='getServiceCatalog'/>
    )
}

export {WrappedService}