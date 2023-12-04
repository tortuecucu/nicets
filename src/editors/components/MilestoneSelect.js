import { WrappedApiSelect } from "./WrappedApiSelect"

const MilestoneSelect = (props) => {
    return(
        <WrappedApiSelect label='Jalon' datamapper={(s)=> {
            return {
                value: s.id,
                label: s.name
            }
        }} apiFunction="getMilestones" {...props} />
    )
}

export { MilestoneSelect }