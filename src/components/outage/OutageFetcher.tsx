import { ChildrenProp } from "src/types/common"
import { useOutage } from "src/hooks/backend/useOutage"
import { DataManager } from "../puller/DataPuller"
import { Outage } from "src/types/outage"

type OutageFetcherProps = {
    id: number,
    toast?: any,
    children: ChildrenProp,
    show?: boolean,
    loadingElement?: React.ReactElement,
    errorElement?: React.ReactElement,
    fallback?: React.ReactElement
}

const OutageFetcher = (props: OutageFetcherProps) => {
    const {getById} = useOutage()

    const fetchOutage = async (): Promise<Outage|undefined> => {
        const [outage, err] = await getById(props.id)
        if (err) {
            return undefined
        } else {
            return outage as Outage
        }
    }

    return(
        <DataManager promise={fetchOutage} toast={props.toast} show={props.show} loadingElement={props.loadingElement} errorElement={props.errorElement} fallback={props.fallback}>
            {props.children}
        </DataManager>
    )
}

export {OutageFetcher}