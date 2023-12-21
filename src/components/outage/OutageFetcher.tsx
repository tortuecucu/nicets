import { ChildrenProp } from "src/types/common"
import { useOutage } from "src/hooks/backend/useOutage"
import { DataManager, ToastProp } from "../puller/DataPuller"
import { PageLoader } from "../utils/PulseLoader"
import { OutageNotFound } from "../utils/BigMessages"
import { OutageRecord } from "src/hooks/backend/useOutage"


type OutageFetcherProps = {
    id: number,
    toast?: ToastProp,
    children: ChildrenProp,
    show: boolean,
    loadingElement?: React.ReactElement,
    errorElement?: React.ReactElement,
    fallback?: React.ReactElement
}

const OutageFetcher = (props: OutageFetcherProps) => {
    const {getById} = useOutage()

    const fetchOutage = async (): Promise<OutageRecord|undefined> => {
        const [outage, err] = await getById(props.id)
        if (err) {
            console.error(err)
            return undefined
        } else {
            return outage as OutageRecord
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
    fallback: <OutageNotFound />,
    show: true
}

export {OutageFetcher}