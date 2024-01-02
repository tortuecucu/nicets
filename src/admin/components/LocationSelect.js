import { WrappedSelect } from "./WrappedSelect"


//TODO: use api
const LocationSelect = ({control, name, id, layout, className}) => {
    const priorities = [
        { value: 1, label: "Le Havre" },
        { value: 2, label: "Colomiers" },
        { value: 3, label: "Burnley" }
    ]
    return(
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label='Site' values={priorities}/>
    )
}

export {LocationSelect}