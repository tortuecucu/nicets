import type { OutageSingleProp } from './OutageItem';
import useDate from 'src/hooks/backend/useDate';
import { useArray } from 'src/hooks/custom/useArray';
import { OutageEta } from 'src/types/outageeta';

function EtaSelector(props: OutageSingleProp) {
    const {isPast} = useDate()
    const {array, filter} = useArray(props.outage.etas || [])
    filter((eta) => {
        return !isPast(eta.earliestEta)
    })

    if (Array.isArray(array) && array.length > 0) {
        return <ItemEta eta={array[0]}/>
    } else {
        return <></>
    }
}

type ItemEtaProps = {
    eta: OutageEta
}

function ItemEta(props: ItemEtaProps) {
    const {ago} = useDate()
    return (<>
        <div className="eta inner text-center">
            {props.eta.earliestEta ?
                <>
                    <p className="hour mb-0 fs-4">{ago(props.eta.earliestEta)}</p>
                    {props.eta.confidence && <p className="confidence mb-0 fw-light lh-1">confiance à <span className="rate fw-bolder">{props.eta.confidence}%</span></p>}
                </>
                :
                <p>no eta</p>
            }
        </div>
    </>)
}



export {EtaSelector}