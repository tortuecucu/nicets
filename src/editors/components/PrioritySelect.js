import { WrappedSelect } from "./WrappedSelect"

const PrioritySelect = ({control, name, id, layout, className}) => {
    const priorities = [
        { value: 1, label: "P1" },
        { value: 2, label: "P2" },
        { value: 3, label: "P3" }
    ]
    return(
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label='Priorité' values={priorities}/>
    )
}

export {PrioritySelect}