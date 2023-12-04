import { useRef } from "react";
import { useState } from "react"
import { Modal } from "react-bootstrap"
import {UnfinishedFeature} from "../utils/Alerts";

function MissingBanner({ className, callBack }) {
    return (
        <div className={`bg-warning-subtle bg-opacity-75 p-2 rounded hstack ` + className}>
            <p className='text-warning-emphasis ps-4 m-0 fw-semibold'>Il manque quelque chose ? <span className='fw-light'>Partagez l'info avec les autres utilisateurs !</span></p>
            <button className="btn btn-warning ms-auto" onClick={callBack}>Je vois, j'agis !</button>
        </div>
    )
}

function MissingModal({ visible, callback }) {
    return (
        <>
            <Modal show={visible} onHide={callback} size='xl' backdrop={true} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Poka Yoke perturbation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalContent />
                </Modal.Body>
            </Modal>
        </>
    )
}

function ModalContent() {
    const [step, setStep] = useState(0);
    const stepChanged = (index) => {
        setStep(index);
    }
    return (
        <>
            <UnfinishedFeature />
            <div className="d-flex flex-row p-2">
                <div className="">
                    <Stepper stepIndex={step} />
                </div>
                <div className="flex-grow-1 ms-3 h-100">
                    <Wizard stepChanged={stepChanged} />
                </div>
            </div>
        </>
    )
}

function Stepper({ stepIndex }) {
    return (<>
        <div className="list-group border-primary-subtle shadow">
            <label className="list-group-item d-flex gap-2">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked={stepIndex >= 1 ? true : false}></input>
                <span className="fw-semibold">
                    Perturbation déclarée
                    <small className="d-block text-body-secondary fw-lighter">Le helpdesk est informé du dysfonctionnement</small>
                </span>
            </label>
            <label className="list-group-item d-flex gap-2">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked={stepIndex >= 2 ? true : false}></input>
                <span className="fw-semibold">
                    Impact qualifié
                    <small className="d-block text-body-secondary fw-lighter">L'impact sur l'entreprise est caractérisé</small>
                </span>
            </label>
            <label className="list-group-item d-flex gap-2">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked={stepIndex >= 3 ? true : false}></input>
                <span className="fw-semibold">
                    Priorité adaptée
                    <small className="d-block text-body-secondary fw-lighter">L'impact est connu de l'incident manager</small>
                </span>
            </label>

        </div>
    </>)
}

function Wizard({ stepChanged }) {
    const [step, setStep] = useState(0);
    const clickCallback = (action, index) => {
        switch (action) {
            case 'next':
                const newState = step + 1;
                setStep(newState);
                stepChanged(newState);
                break;

            default:
                break;
        }
    }
    return (<>
        {step === 0 && <PanelHome callback={clickCallback} />}
        {step === 1 && <PanelDeclaration callback={clickCallback} />}
        {step === 2 && <PanelImpact callback={clickCallback} />}
        {step === 3 && <PanelPriority callback={clickCallback} />}

    </>)
}

function PanelBase({ children, title, footer }) {
    return (<>
        <div className="panel shadow border rounded p-3 pt-2" style={{ "height": "30rem" }}>
            <h4 className="fw-semibold text-primary mb-4">{title}</h4>
            <div className="content">{children}</div>
            {footer && <>
                <div className="hstack border-top pt-2">
                    {footer}
                </div>
            </>}
        </div>
    </>)
}

function PanelHome({ callback }) {
    const nextCallback = () => {
        callback('next', null);
    }
    return (
        <PanelBase title={'Il manque un incident ?'} footer={<><button className="btn btn-primary ms-auto" onClick={nextCallback}>Suivant</button></>}>
            <p className="lead h-100">Si un incident manque, c'est qu'une étape en amont n'a pas été réalisée.</p>
            <p>Cet assistant vous permettra d'identifier et de corriger le problème.</p>
        </PanelBase>
    )
}

function PanelDeclaration({ callback }) {
    const inctInput = useRef(null)
    const nextCallback = () => {
        callback('next', null);
    }
    return (
        <PanelBase title={'1/3 - Un incident doit avoir été déclaré'} footer={<><button className="btn btn-primary ms-auto" onClick={nextCallback}>Suivant</button></>}>
            <p className="lead">Ces 3 points doivent être validés:</p>
            <ol>
                <li className="fw-semibold text-primary-emphasis">Le Helpdesk a été appelé<br></br><span className="fw-light"> Les déclaration par tout autre moyen ne permettent pas de déclencher une réponse urgente.</span></li>
                <li className="mt-3 fw-semibold text-primary-emphasis">Les informations fournies sont exactes et complètes<br></br><span className="fw-light">Tout ce qui permet de comprendre la nature de la panne et dans quelle conditions elles survient a été fourni</span></li>
                <li className="fw-semibold text-primary-emphasis mt-3">J'ai une référence d'incident<br></br><span className="fw-light"> Chaque incident est identifié par un code débutant par INCT</span></li>
            </ol>
            <input ref={inctInput} className="form-control form-control-lg m-4 w-75" type="text" placeholder="INCT0000000" id="number"></input>
        </PanelBase>
    )
}

function PanelImpact({ callback }) {
    const nextCallback = () => {
        callback('next', null);
    }
    return (
        <PanelBase title={'2/3 - Qualification de l\'impact'}>
            <p className="lead mb-0">L'impact de l'incident doit être qualifié par le RIP* de votre Direction</p>
            <p className="fw-light text-secondary">RIP: Responsable d'Informatisation du Processus</p>
            <div className="row my-4 fw-semibold">
                <p className="text-primary-emphasis">Quelle est votre Direction ?</p>
                <div className="row px-4">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Votre Direction</option>
                        <option value="DI">Direction Industrielle</option>
                        <option value="CSSD">CSSD</option>
                        <option value="DT">Direction Technique</option>
                    </select>
                </div>
            </div>

            <div className="row my-4 fw-semibold">
                <p className="text-primary-emphasis">Avez-vous informé votre RIP ?</p>
                <div className="rounded fw-light text-secondary-emphasis">
                    <ul>
                        <li>Thierry Saillant</li>
                        <li>Anne-Claire Cherfils</li>
                        <li>Hadja Bah</li>
                    </ul>
                </div>
                <div className="hstack ps-4">
                    <button className="btn btn-primary">Non, j'informe mon RIP</button>
                    <button className="ms-4 btn btn-success" onClick={nextCallback}>Oui, mon RIP est informé</button>
                </div>
            </div>

        </PanelBase>
    )
}

function PanelPriority({ callback }) {
    const nextCallback = () => {
        callback('next', null);
    }
    return (
        <PanelBase title={'2/3 - Triage & priorisation de l\'incident'} footer={<><button className="btn btn-primary ms-auto" onClick={nextCallback}>Suivant</button></>}>
            <p className="lead mb-0">Cochez toutes les affirmations qui sont vraies</p>
            <div className="row my-4 fw-semibold">
                <p className="text-primary-emphasis">Comportement de l'application </p>
                <div className="row px-4 fw-lighter">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">accès impossible</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">Message d'erreur</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">Autre / Je ne sais pasx</label>
                    </div>
                </div>
            </div>

            <div className="row my-4 fw-semibold">
                <p className="text-primary-emphasis">Combien de personnes sont touchées </p>
                <div className="row px-4 fw-lighter">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">Uniquement moi</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">Quelques personnes</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">Tout le monde</label>
                    </div>

                </div>
            </div>

        </PanelBase>
    )
}

function MissingItem({ className }) {
    const [visible, setVisible] = useState(false);
    const clickCallback = () => {
        setVisible(true);
    }
    const hideCallback = () => {
        setVisible(false);
    }
    return (
        <>
            <MissingBanner className={className} callBack={clickCallback} />
            <MissingModal visible={visible} callback={hideCallback} />
        </>
    )
}

export default MissingItem;