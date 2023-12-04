import { WrappedSelect } from "./WrappedSelect"

//NEXT: use api instead of fixed list
const TypeSelect = ({control, name, id, layout, className}) => {
    const priorities = [
        { value: 1, label: "Panne - Interruption de Service" },        
        { value: 4, label: "Panne-Ralentissement" },
        { value: 5, label: "Panne- Perte fonctionnelle" },
        { value: 2, label: "Préalerte" },
        { value: 3, label: "Maintenance" }
    ]
    return(
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label='Type' values={priorities}/>
    )
}

export {TypeSelect}