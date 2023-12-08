import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { OutageListItem } from '../../../../hooks/backend/useOutageList';
import { ItemAction } from './ItemAction';
import { EtaSelector } from './ItemEta';
import { useValueFallback } from '../../../../hooks/custom/useValueFallback';
import { TimeAgo } from '../../../utils/TimeAgo';

export type OutageSingleProp = {
    outage: OutageListItem
}

function OutageItem(props: OutageSingleProp) {
    const navigate = useNavigate();

    function handleClick() {
        navigate('outage/' + props.outage.id);
    }

    return (
        <>
            <ErrorBoundary fallback={<div>Error lors de l'affichage de l'outage</div>}>
                <li className="list-group-item outage" onClick={handleClick}>
                    <div className="hstack">
                        <div className="status">
                            <ItemStatus outage={props.outage} />
                        </div>
                        <div className="ms-3">
                            <ItemDescription outage={props.outage} />
                        </div>
                        <div className="mx-3 ms-auto">
                            <ItemAction outage={props.outage} />
                        </div>
                        <div className="">
                            {/* <EtaSelector outage={props.outage} /> */} //TODO: reenable it after debug
                        </div>
                    </div>
                </li>
            </ErrorBoundary>
        </>
    )
}

function ItemStatus(props: OutageSingleProp) {
    return (<>
        <div className={"chips " + props.outage.status.name}>
            <span className="status text-center w-100">{props.outage.status.label}</span>
        </div>
    </>)
}

function ItemDescription(props: OutageSingleProp) {
    return (<>
        <p className="headline mb-0 text-secondary">
            <span className="type text-secondary-secondary text-capitalize">{props.outage.type?.label}</span>
            <span className="occured text-black-50 ms-3"> <TimeAgo date={props.outage.startAt} /> </span>
        </p>
        <p className="system">
            <span className="type text-capitalize fw-bold">{useValueFallback(props.outage.service?.name, 'application inconnue')}</span>
            <span className="punchline fw-medium ms-2">{props.outage.shortDescription}</span>
        </p>
    </>)
}

export { OutageItem }