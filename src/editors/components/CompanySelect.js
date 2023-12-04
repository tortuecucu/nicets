import { WrappedSelect } from "./WrappedSelect"

//NEXT: use api
const CompanySelect = ({control, name, id, layout, className}) => {
    const companies = [
        { value: 1, label: "Safran SA" },
        { value: 2, label: "Safran Nacelles" },
        { value: 3, label: "Safran Aircraft Engines" }
    ]
    return(
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label='Compagnie' values={companies}/>
    )
}

export {CompanySelect}