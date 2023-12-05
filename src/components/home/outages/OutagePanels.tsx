import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import dateFormat from "dateformat";
import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr.json';

import { Spinner } from 'react-bootstrap';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../utils/Error';
import { useHelpdeskContext } from '../../../contexts/HelpdeskContext';

import MissingItem from '../../outage/MissingItem';
import { TitledContent } from '../../utils/TitledContent';
import { useOutageList } from '../../../api/useOutageList';

import "./outagepanels.css";
TimeAgo.addDefaultLocale(fr);



function OutageItem({ outage }) {
    const navigate = useNavigate();
    const { setShowModal } = useHelpdeskContext()

    function handleClick(e) {

        if (e.target.id === "outageCta" && e.target.name !== 'helpdesk') {
            navigate(e.target.name + "/" + outage.id);
        } else if (e.target.id === "outageCta" && e.target.name === 'helpdesk') {
            setShowModal(true);
        } else {
            navigate('outage/' + outage.id);
        }
    }

    return (
        <>
            <li className="list-group-item outage" onClick={handleClick}>
                <div className="hstack">
                    <div className="status">
                        <ItemStatus outage={outage} />
                    </div>
                    <div className="ms-3">
                        <ItemDescription outage={outage} />
                    </div>
                    <div className="mx-3 ms-auto">
                        <ItemAction outage={outage} />
                    </div>
                    <div className="">
                        <EtaSelector outage={outage} />
                    </div>
                </div>
            </li>
        </>
    )
}

function ItemStatus({ outage }) {
    return (<>
        <div className={"chips " + outage.status.name}>
            <span className="status text-center w-100">{outage.status.label}</span>
        </div>
    </>)
}

function EtaSelector({ outage }) {
    const [earliest, setEarliest] = useState(null);
    const [confidence, setConfidence] = useState(null);

    useMemo(() => {
        try {
            if (Array.isArray(outage.etas) && outage.etas.length > 0) {
                const eta = outage.etas[outage.etas.length - 1];

                //ensure not ETA set in the past is displayed
                if (Date.parse(eta.earliestEta) > Date.now()) {
                    setEarliest(new Date(eta.earliestEta));
                    setConfidence(eta.confidence);
                }

            } else if (outage.type.isFailure === false) {
                setEarliest(new Date(outage.maintenance.plannedEnd));
            }
        } catch (e) {
            console.error(e);
        }

    }, [outage])

    return (
        <>{earliest && <ItemEta earliest={earliest} confidence={confidence} />}</>
    )
}

function ItemEta({ earliest, latest, confidence }) {
    function formatEta() {
        let etaMask = "HH:MM"
        if (earliest.toDateString() !== new Date().toDateString()) {
            etaMask = "d mmm";
        }
        return dateFormat(earliest, etaMask)
    }
    return (<>
        <div className="eta inner text-center">
            {earliest ?
                <>
                    <p className="hour mb-0 fs-4">{formatEta()}</p>
                    {confidence && <p className="confidence mb-0 fw-light lh-1">confiance à <span className="rate fw-bolder">{confidence}%</span></p>}
                </>
                :
                <p>no eta</p>
            }
        </div>
    </>)
}

function ItemAction({ outage }) {
    const [name, setName] = useState(null);
    const [label, setLabel] = useState(null);
    useMemo(() => {
        try {
            var action = null
            var lbl = null;
            if ([1, 4, 5].includes(outage.typeId)) {
                switch (outage.statusId) {
                    case 1:
                        action = 'helpdesk';
                        lbl = 'Appeler le HD';
                        break;
                    case 2:
                    case 3:
                        action = 'affected';
                        lbl = 'Affecté(e) ?';
                        break;
                    case 4:
                        action = 'nominal';
                        lbl = 'Résolu ?';
                        break;
                    case 5:
                        action = 'workaround';
                        lbl = 'Rétabli ?';
                        break;
                    case 6:
                        action = 'feedback';
                        lbl = 'Satisfait(e) ?';
                        break;
                    default:
                        action = 'helpdesk';
                        lbl = 'Appeler le HD';
                        break;
                }
            } else {
                action = null;
            }
            setName(action);
            setLabel(lbl);
        } catch (e) {
            console.error(e);
            setName(null);
        }
    }, [outage])
    return (<>
        {name && <a id="outageCta" name={name} className="btn btn-primary w-100 action">{label}</a>}
    </>)
}

function ItemDescription({ outage }) {
    const systemName = () => {
        try {
            return outage.service.name
        } catch (e) {
            console.info(e);
            return 'Application inconnue'
        }
    }
    const shorDesc = () => {
        try {
            return outage.shortDescription;
        } catch (e) {
            console.info(e)
            return ''
        }
    }
    return (<>
        <p className="headline mb-0 text-secondary">
            <span className="type text-secondary-secondary text-capitalize">{outage.type.label}</span>
            <span className="occured text-black-50 ms-3"> <ItemDuration outage={outage} /></span>
        </p>
        <p className="system">
            <span className="type text-capitalize fw-bold">{systemName()}</span>
            <span className="punchline fw-medium ms-2">{shorDesc()}</span>
        </p>
    </>)
}

function ItemDuration({ outage }) {
    const start = useMemo(() => {
        try {
            return (outage.startAt) ? Date.parse(outage.startAt) : undefined
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }, [outage])
    return (<>
        {start && <ReactTimeAgo date={start} locale="fr-FR" />}
    </>);
}


function OutageList({ outages }) {
    const items = outages.map((outage) => <OutageItem key={outage.id.toString()} outage={outage} />);
    return (
        <>
            <div className="d-flex flex-row-reverse">
                <p className="align-right mb-1 eta-label text-secondary me-2 fw-light">rétablissement prévu</p>
            </div>
            <ul className="list-group outages">
                {items}
            </ul>
        </>
    )
}



function OutagesPanel() {
    return (
        <>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                <TitledContent title='Perturbations en cours' titleClass='mb-0' level={4} lead='Liste les maintenances et les dysfonctionnements en cours' leadClass='fw-light text-secondary'>
                    <Loader />
                    <MissingItem className='mt-2' />
                </TitledContent>
            </ErrorBoundary>
        </>
    )
}

function Loader() {
    const { outages, isLoading } = useOutageList()

    return (
        <>
            {isLoading && <>
                <div className='hstack'>
                    <Spinner className='my-4' animation="border" variant="primary" />
                    <span className='ms-2 text-secondary'>Recherche des perturbations en cours...</span>
                </div>
            </>}
            {(!isLoading && outages.length > 0) && <OutageController outages={outages} />}
            {(!isLoading && outages.length === 0) && <NoOutages />}
        </>
    )
}

function OutageController({ outages }) {
    return (
        <div>
            {/* <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Actifs</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Mes dysfonctionnements</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Résolus</a>
                </li>
            </ul> */}
            <OutageList outages={outages} />
        </div >
    )
}

function NoOutages() {
    return (
        <>Aucune perturbation à afficher</>
    )
}


export { OutagesPanel }