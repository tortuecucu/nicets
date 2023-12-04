import { WrappedSelect } from "./WrappedSelect"

//NEXT: use api
const RelationSelect = ({control, name, id, layout, className}) => {
    const priorities = [
        { value: 1, label: "Exempt" },
        { value: 2, label: "Affecté" },
        { value: 3, label: "Non déterminé" }
    ]
    return(
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label='Relation' values={priorities}/>
    )
}

export {RelationSelect}