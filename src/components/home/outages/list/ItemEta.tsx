import { useState, useMemo } from 'react';
import type { OutageSingleProp } from './OutageItem';
import { Eta } from '../../../../hooks/backend/useOutageList';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function EtaSelector(props: OutageSingleProp) {
    const [earliest, setEarliest] = useState(null);
    const [confidence, setConfidence] = useState(null);

    //TODO: refactor it

    useMemo(() => {
        try {
            if (Array.isArray(props.outage.etas) && props.outage.etas.length > 0) {
                const eta = props.outage.etas[props.outage.etas.length - 1];

                //ensure not ETA set in the past is displayed
                if (Date.parse(eta.earliestEta) > Date.now()) {
                    setEarliest(new Date(eta.earliestEta));
                    setConfidence(eta.confidence);
                }

            } else if (outage.type.isFailure === false) {
                setEarliest(new Date(props.outage.maintenance.plannedEnd));
            }
        } catch (e) {
            console.error(e);
        }

    }, [outage])

    const notInPast = props.outage.etas.filter((eta: Eta) => {
        return true //TODO: code it
    })

    let latestEta = notInPast[0]

    return (
        <>{earliest && <ItemEta eta={latestEta} />}</>
    )
}

type ItemEtaProps = {
    eta: Eta
}

function ItemEta(props: ItemEtaProps) {
    return (<>
        <div className="eta inner text-center">
            {props.eta.earliestEta ?
                <>
                    <p className="hour mb-0 fs-4">{dayjs(props.eta.earliestEta).fromNow()}</p>
                    {props.eta.confidence && <p className="confidence mb-0 fw-light lh-1">confiance à <span className="rate fw-bolder">{props.eta.confidence}%</span></p>}
                </>
                :
                <p>no eta</p>
            }
        </div>
    </>)
}



export {EtaSelector}