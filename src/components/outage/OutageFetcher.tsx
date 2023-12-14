import { ChildrenProp } from "src/types/common"
import { useOutage } from "src/hooks/backend/useOutage"
import { DataManager } from "../puller/DataPuller"
import { OutageType } from "src/types/outage"
import { PageLoader } from "../utils/PulseLoader"
import { OutageNotFound } from "../utils/BigMessages"

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

    const fetchOutage = async (): Promise<OutageType|undefined> => {
        const [outage, err] = await getById(props.id)
        if (err) {
            return undefined
        } else {
            return outage as OutageType
        }
    }

    return(
        <DataManager promise={fetchOutage} toast={props.toast} show={props.show} loadingElement={props.loadingElement} errorElement={props.errorElement} fallback={props.fallback}>
            {props.children}
        </DataManager>
    )
}
OutageFetcher.defaultProps = {
    loadingElement: <PageLoader />,
    fallback: <OutageNotFound />
}

export {OutageFetcher}