import type { OutageSingleProp } from './OutageItem';
import useDate from 'src/hooks/backend/useDate';
import { OutageEta } from 'src/types/outageeta';

function EtaSelector(props: OutageSingleProp) {
    const {isPast} = useDate()

    const etas = props.outage.etas || []

    if (etas && Array.isArray(etas) && etas.length > 0) {
        const actives = etas.filter((eta) => {
            return !isPast(eta.earliestEta)
        })
        if (actives.length > 0) {
            return <ItemEta eta={actives[0]} />
        }
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