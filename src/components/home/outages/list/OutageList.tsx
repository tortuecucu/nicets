import { OutageItem } from './OutageItem';
import { OutageListItem } from '../../../../hooks/backend/useOutageList';

type OutageListProps = {
    outages: Array<OutageListItem>
}

function OutageList(props: OutageListProps) {
    return (
        <>
            <div className="d-flex flex-row-reverse">
                <p className="align-right mb-1 eta-label text-secondary me-2 fw-light">rétablissement prévu</p>
            </div>
            <ul className="list-group outages">
                {props.outages.map((outage) => <OutageItem key={outage.id.toString()} outage={outage} />)}
            </ul>
        </>
    )
}

export {OutageList}