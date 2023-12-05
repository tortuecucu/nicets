import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../contexts/ApiProvider';
import {ErrorPanel} from "../../components/utils/Error";
import Loader from "../../components/utils/Loader";
import { OutageSummary } from '../../components/home/outages/OutagePanels';
import { Toast } from 'primereact/toast';

function ManagementForm({ values, callback }) {
    return (
        <>
            <div className="mt-3 mb-5 p-3 bg-body rounded shadow-sm h-100 ">
                <h5 className="pb-2 mb-0">{values.title}</h5>
                <div className="d-flex text-body-secondary pt-3">
                    <p>{values.desc}</p>
                </div>
                <button type="button" className="btn btn-primary" onClick={callback}>{values.cta}</button>
            </div>
        </>
    );
}

//NEXT: utiliser un message a la place
function SubscriptionClosed() {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">L'incident est clos</h6>
                <p className="lead">Plus aucune notification ne sera envoyée pour cet incident</p>
            </div>
        </>
    );
}

const Notify = () => {
    const api = useApi();
    const { id, value } = useParams();
    const [outage, setOutage] = useState(null);
    const [state, setState] = useState(0);
    const [intent, setIntent] = useState("subscribe");
    const [ui, setUi] = useState(null);
    const toast = useRef(null);
    /*
    0: page is loading
    1: subscription is open
    2: subscription is closed because the incident is closed
    3: error, unable to load the incident
    */

    function handleClick() {
        (async () => {
            const optIn = (intent === "subscrible") ? true : false;
            const [response, err] = await api.subscribe(outage.ID, optIn);
            if (err) {
                console.error(err);
            } else if (response) {
                toast.current.show({ severity: 'success', summary: 'Compris !', detail: 'Votre souhait est pris en compte', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Oops', detail: 'Erreur, merci de réessayer', life: 3000 });
            }
        })();
    }

    useEffect(() => {
        (async () => {
            const [response, err] = await api.getOutageByID(id);
            if (err) {
                console.error(err);
            } else {
                setOutage(response);
                try {
                    if (response.status.ID < 90) {
                        var cleanedValue = api.sanitizeString((value ? value : 'yes'), ['yes', 'no'], 'yes');
                        setIntent(cleanedValue == 'yes' ? 'subscribe' : 'unsubscribe');
                        if (cleanedValue === 'yes') {
                            setUi({
                                'title': 'S\'abonner',
                                'desc': 'Vous recevrez des informations régulières sur cet incident.',
                                'cta': 'Je m\'abonne'
                            });
                        } else {
                            setUi({
                                'title': 'Se désabonner',
                                'desc': 'Vous ne recevrez plus de communications. Vous pourrez toujours consulter ce portail en cas de besoin.',
                                'cta': 'Je me désabonne'
                            });
                        }
                        setState(1);
                    } else {
                        setState(2);
                    }
                } catch (error) {
                    console.log(error);
                    setState(3);
                }
            }
        })();
    }, [api]);

    return (
        <>
            <div className="row mb-4">
                <div className="col col-4 col-md-4">
                    {(state == 1 || state == 2) && <OutageSummary outage={outage} />}
                </div>
                <div className="col col-8 col-md-8">
                    {state == 0 && <Loader />}
                    {state == 1 && <ManagementForm values={ui} callback={handleClick} />}
                    {state == 2 && <SubscriptionClosed />}
                    {state == 3 && <ErrorPanel />}
                </div>
            </div>
            <Toast ref={toast} />
        </>
    );
};

export default Notify;