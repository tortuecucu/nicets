import { Escalate } from "./Escalate";
import { OutageType } from "src/types/outage";
import { createContext, useState, useContext} from "react";

/**
 * Dirty development code
 * not intented to be published in production
 */

type OutageProp = {
    outage: OutageType
}

type StateContextContent = {
    status: number ,
    setStatus: (value: number) => void
}

const StateContext = createContext<StateContextContent>({
    status: 0,
    setStatus: (value: number) => {}
});

function SlowRunner(props: OutageProp) {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h5>Demander l'actualisation de l'incident</h5>
                <div>
                    infos connues
                    formulaire
                </div>
            </div>
        </>
    );
}

function ImpactReview(props: OutageProp) {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h5>Améliorer l'impact opérationnel</h5>
                <div>
                    infos connues
                    formulaire
                </div>
            </div>
        </>
    )
}



function Chooser(props: OutageProp) {
    const { setStatus } = useContext(StateContext);
    function impact() {
        setStatus(4);
    }
    function alert() {
        setStatus(5);
    }
    function escalate() {
        setStatus(6);
    }
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h3>Qu'avez-vous constaté ?</h3>
                <ul className="list-group list-group-horizontal my-4">
                    <li className="list-group-item">
                        <h5 className="card-title mb-4">Impact opérationnel incomplet</h5>
                        <p className="card-text">Compléter les informations à propos de l'impact de l'incident sur vos activités</p>
                        <button className="btn btn-primary my-4" name="choice-impact" onClick={impact}>Je participe</button>
                    </li>
                    <li className="list-group-item">
                        <h5 className="card-title mb-4">Ticket non actualisé</h5>
                        <p className="card-text">Vous n'êtes pas régulièrement tenu(e) informé(e) de l'avancement</p>
                        <button className="btn btn-primary my-4" name="choice-alert" onClick={alert}>J'alerte</button>
                    </li>
                    <li className="list-group-item">
                        <h5 className="card-title mb-4">Traitement non conforme</h5>
                        <p className="card-text">Escalader auprès des managers afin d'obtenir un traitement conforme</p>
                        <button className="btn btn-danger my-4" name="choice-escalate" onClick={escalate}>J'escalade</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

function ImpactWizard(props: OutageProp) {
    const [status, setStatus] = useState(3);

    return (
        <>
            {props.outage == null ? (
                <></>
            ) : (
                <>
                    <div className="row mt-4">
                        <div className="col col-4">
                            <div className="my-3 p-3 bg-body rounded shadow-sm">
                                <h6 className="pb-2 mb-4">Indisponibilité de PLM Teamcenter</h6>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h6 className="my-0">Durée</h6>
                                        <small>2 heures 53 minutes</small>
                                    </li>
                                    <li className="list-group-item">
                                        <h6 className="my-0">Impact</h6>
                                        <small>157 utilisateurs affectés</small>
                                    </li>
                                    <li className="list-group-item">
                                        <h6 className="my-0">Type</h6>
                                        <small>Arrêt non planifié</small>
                                    </li>
                                    <li className="list-group-item">
                                        <h6 className="my-0">Description</h6>
                                        <small>Une crise de rire incontrôlée a affecté tous les utilisateurs du système</small>
                                    </li>
                                </ul>
                                <small className="d-block text-center mt-3">
                                    <button className="link-underline-light">Voir toutes les données sur l'incident</button>
                                </small>
                            </div>
                        </div>
                        <div className="col col-8">
                            <StateContext.Provider value={{ status, setStatus }}>
                                {status === 3 && <Chooser outage={props.outage} />}
                            </StateContext.Provider>
                            {status === 4 && <ImpactReview outage={props.outage} />}
                            {status === 5 && <SlowRunner outage={props.outage} />}
                            {status === 6 && <Escalate outage={props.outage} />}
                        </div>
                    </div>

                </>
            )}
        </>
    );
}

export {ImpactWizard}