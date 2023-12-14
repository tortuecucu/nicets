import { OutageType } from "src/types/outage";
import { useToastContext } from "src/contexts/ToastContext";
import { useImpact } from "src/hooks/backend/useImpact";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

type EscalateProps = {
    outage: OutageType
}

function Escalate(props: EscalateProps) {
    const [valid, setValid] = useState<boolean>(false);
    const [modalImpact, setModalImpact] = useState<boolean>(false);
    const {errorToast, successToast, retryLater} = useToastContext()
    const {escalate} = useImpact()

    function validate() {
        return false;
    }

    function submit() {

        if (!validate()) {
            errorToast('Saisie invalide', 'Vérifiez votre saisie')
            return
        }

        //NEXT: validate
        (async () => {
            const payload = {}; //format payload
            const [success, err] = await escalate(props.outage, payload)
            if (err) {
                retryLater()
                console.error(err);
            } else if (success) {
                successToast('Merci', 'Votre demande d\'escalation a été enregistrée')
            } else {
                retryLater()
            }
        })();
    }

    function checksChanged() {
        var list = document.getElementsByClassName("check");
        var valid = true;
        for (let item of list) {
            const checkbox = item as HTMLInputElement
            if (checkbox.checked === false) {
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
                    <textarea className="form-control pb-4" id="submitEscalation" rows={3} placeholder="Des éléments complémentaires ?"></textarea>
                </div>
                <Button className="btn btn-danger" disabled={!valid} onClick={submit}>J'escalade</Button>
            </div>
            <DraftModal show={modalImpact} onClose={() => setModalImpact(false)} />
        </>
    )
}

type DraftModalProps = {
    show: boolean,
    onClose: () => void
}

const DraftModal = (props: DraftModalProps) => {
    return (
        <Modal show={props.show} className="modal fade" id="modalImpact">
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { Escalate }