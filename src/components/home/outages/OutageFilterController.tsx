import type { OutageListItem } from "../../../hooks/backend/useOutageList"
import { OutageList } from "./list/OutageList"

type OutageFilterControllerProps = {
    outages: Array<OutageListItem>
}

//TODO: code it
function OutageFilterController(props: OutageFilterControllerProps) {
    return (
        <div>
            <OutageList outages={props.outages} />
        </div >
    )
}

export {OutageFilterController}