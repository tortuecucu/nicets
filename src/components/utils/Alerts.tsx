import { useState } from "react";
import { ExclamationTriangle } from "react-bootstrap-icons";

function UnfinishedFeature() {
    const [showDetails, setShowDetails] = useState(false);
    const clickCallback = () => {
        setShowDetails(!showDetails);
    }
    return (
        <div className="alert alert-warning p-1" role="alert">
            <div className="hstack w-100">
                <ExclamationTriangle className="ms-2" />
                <span className="fw-semibold ms-1">En cours de développement</span>
                <span className="ms-1 fw-light">Vos données ne seront pas enregistrées</span>
                <button onClick={clickCallback} className="ms-auto btn btn-link btn-sm">{showDetails ? 'fermer' : 'en savoir plus'}</button>
            </div>
            {showDetails && <>
                <div className="fw-light">
                    <p className="mb-0 mt-2 ms-2">Nous sommes en train de coder cette page et certaines fonctions ne sont pas encore actives.</p>
                    <p className="mb-0 ms-2">Vous pouvez l'utiliser pour tester l'interface et nous aider à l'améliorer.</p>
                    <p className="mb-0 ms-2">Aucun formulaire ne sera envoyé, vos données seront perdues.</p>
                </div>
            </>}
        </div>
    )
}

function DummyData() {
    const [showDetails, setShowDetails] = useState(false);
    const clickCallback = () => {
        setShowDetails(!showDetails);
    }
    return (
        <div className="alert alert-warning p-1" role="alert">
            <div className="hstack w-100">
                <ExclamationTriangle className="ms-2" />
                <span className="fw-semibold ms-1">Données fictives!</span>
                <button onClick={clickCallback} className="ms-auto btn btn-link btn-sm">{showDetails ? 'fermer' : 'en savoir plus'}</button>
            </div>
            {showDetails && <>
                <div className="fw-light">
                    <p className="mb-0 mt-2 ms-2">Ce panneau expose une fonction future.</p>
                    <p className="mb-0 ms-2">Les données présentées sont fictives et n'ont aucun lien avec la réalité.</p>
                </div>
            </>}
        </div>
    )
}

export  {UnfinishedFeature, DummyData};