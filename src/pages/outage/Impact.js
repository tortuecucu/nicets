import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import { useApi } from '../../contexts/ApiProvider';
import { Parameters, useConfig } from "../../hooks/config/useConfig";
import { Toast } from 'primereact/toast';

function Escalate({ outage }) {
    const api = useApi();
    const [valid, setValid] = useState(false);
    const [modalImpact, setModalImpact] = useState(false);
    const toast = useRef(null);

    function validate() {
        return false;
    }

    function submit() {

        if (!validate()) {
            toast.current.show({ severity: 'error', summary: 'Saisie invalide', detail: 'Vérifiez votre saisie', life: 3000 });
            return
        }

        //NEXT: validate
        (async () => {
            const payload = {}; //format payload
            const [response, err] = await api.postEscalation(outage.ID, payload);
            if (err) {
                console.error(err);
            } else if (response) {
                toast.current.show({ severity: 'success', summary: 'Merci', detail: 'Votre demande d\'escalation a été enregistrée', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Oops', detail: 'Erreur, merci de réessayer', life: 3000 });
            }

        })();


    }
    function checksChanged() {
        var list = document.getElementsByClassName("check");
        var valid = true;
        for (let item of list) {
            if (item.checked === false) {
                valid = false;
                break;
            }
        }
        if (valid) {
            setValid(true);
        } else {
            setValid(false);
        }
    }
    function impactChanged() {
        setModalImpact(true);
        checksChanged();
    }
    const mdImpactClose = () => setModalImpact(false);

    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h4>Déclencher une escalation managériale</h4>
                <div className="my-3 p-2 bg-primary rounded shadow-sm">
                    <p className="text-white my-0">Vous avez déclenché <span className="fw-bolder">78 escalations</span> en 2022.</p>
                </div>
                <div>
                    <h5 className="border-bottom mt-5 mb-3">Pourquoi escalader ?</h5>

                    <div className="form-check mb-1">
                        <input className="form-check-input" type="checkbox" value="" id="why-slow"></input>
                        <label className="form-check-label" htmlFor="why-slow">Le traitement est trop lent</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input" type="checkbox" value="" id="why-error"></input>
                        <label className="form-check-label" htmlFor="why-error">Le processus n'est pas respecté</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input" type="checkbox" value="" id="why-other"></input>
                        <label className="form-check-label" htmlFor="other">Autre</label>
                    </div>


                </div>
                <div>
                    <h5 className="border-bottom mt-5 mb-3">Vers quel(s) manager(s) escalader ?</h5>
                    <div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-ddsi"></input>
                            <label className="form-check-label" htmlFor="who-ddsi">Directeur DSSI, <span className="text-secondary">Philippe JAMES</span></label>
                        </div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-dsi"></input>
                            <label className="form-check-label" htmlFor="who-dsi">Directrice DSI, <span className="text-secondary">Marie-France CAHUET</span></label>
                        </div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-app"></input>
                            <label className="form-check-label" htmlFor="who-app">Responsable applications & services, <span className="text-secondary">David GODEFROY</span></label>
                        </div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-infra"></input>
                            <label className="form-check-label" htmlFor="who-infra">Responsable de tout, <span className="text-secondary">Thomas GAIDDON</span></label>
                        </div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-exp"></input>
                            <label className="form-check-label" htmlFor="dwho-exp">Responsable d'exploitation, <span className="text-secondary">Thomas GAIDDON</span></label>
                        </div>
                        <div className="form-check mb-1">
                            <input className="form-check-input" type="checkbox" value="" id="who-im" checked disabled></input>
                            <label className="form-check-label" htmlFor="who-im">Incident Manager, <span className="text-secondary">François-Xavier ZAKRZEWSKI</span></label>
                        </div>

                    </div>

                </div>
                <div className="mb-4">
                    <h5 className="border-bottom mt-5 mb-3">Poka Yoke</h5>
                    <div className="form-check mb-1">
                        <input className="form-check-input check" type="checkbox" value="" id="check1" onChange={checksChanged}></input>
                        <label className="form-check-label" htmlFor="check1">L'incident manager a été notifié</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input check" type="checkbox" value="" id="check2" onChange={checksChanged}></input>
                        <label className="form-check-label" htmlFor="check2">L'incident manager n'a pas accusé réception</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input check" type="checkbox" value="" id="check3" onChange={impactChanged}></input>
                        <label className="form-check-label" htmlFor="check3">L'impact opérationnel est conforme à la réalité de terrain</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input check" type="checkbox" value="" id="check4" onChange={checksChanged}></input>
                        <label className="form-check-label" htmlFor="check4">La caractérisation fonctionnelle est complète</label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input check" type="checkbox" value="" id="check5" onChange={checksChanged}></input>
                        <label className="form-check-label" htmlFor="check5">La déclaration d'incident est conforme aux bonnes pratiques</label>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea className="form-control pb-4" id="submitEscalation" rows="3" placeholder="Des éléments complémentaires ?"></textarea>
                </div>
                <Button className="btn btn-danger" disabled={!valid} onClick={submit}>J'escalade</Button>

            </div>

            <Modal show={modalImpact} className="modal fade" id="modalImpact">
                <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={mdImpactClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={mdImpactClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toast ref={toast} />
        </>
    )
}

function SlowRunner({ outage }) {
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

function ImpactReview({ outage }) {
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

const StateContext = createContext();

function Chooser({ outage }) {
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

function ImpactWizard({ outage }) {
    const [status, setStatus] = useState(3);

    return (
        <>
            {outage == null ? (
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
                                {status === 3 && <Chooser outage={outage} />}
                            </StateContext.Provider>
                            {status === 4 && <ImpactReview outage={outage} />}
                            {status === 5 && <SlowRunner outage={outage} />}
                            {status === 6 && <Escalate outage={outage} />}
                        </div>
                    </div>

                </>
            )}
        </>
    );
}

function IncidentSearcher({ onChange }) {
    const onChanged = (event) => {
        let input = event.target.value.toUpperCase().trim();
        if (input.length >= 4) {
            if (input.substring(0, 4) === "INCT") {
                onChange(input);
            } else {

            }
        }
        event.preventDefault();
    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h4 className="pb-2 mb-5">Besoin d'aide à propos d'un incident ?</h4>
            <div className="row mb-2">
                <label htmlFor="colFormLabelLg" className="col-sm-1 col-form-label col-form-label-lg">Référence</label>
                <div className="col-sm-11">
                    <input type="text" className="form-control form-control-lg" id="reference" placeholder="INCT0000000" onChange={onChanged}></input>
                </div>
            </div>
        </div>
    )
}

const Impact = () => {
    const [outage, setOutage] = useState(null);
    const api = useApi();
    const { id } = useParams();

    async function getOutage(key) {
        if (isNaN(key)) {
            return await api.getOutageByNumber(key);
        } else {
            return await api.getOutageByID(key);
        }
    }

    useEffect(() => {
        (async () => {
            if (id != null) {
                const [response, err] = await getOutage(id);
                if (err) {
                    console.error(err);
                } else {
                    setOutage(response);
                }
            }
        })();
    }, [api]);

    const refChange = (reference) => {
        (async () => {
            const config = useConfig()
            reference = String(reference).toUpperCase().trim();
            const regex = new RegExp(config.get(Parameters.INCT_REGEX));
            if (regex.test(reference)) {
                const [outage, err] = await getOutage(reference);
                if (err) {
                    console.error(err);
                } else {
                    setOutage(outage);
                }                
            }
        })();
    }

    const isActive = true;
    return (
        <>
            {outage == null && <IncidentSearcher onChange={refChange} />}
            {isActive && <ImpactWizard outage={outage} />}

        </>
    );
};

export default Impact;