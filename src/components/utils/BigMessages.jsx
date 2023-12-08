import { useNavigate } from "react-router-dom";
import { Parameters, useConfig } from "../../hooks/config/useConfig";

const BigMessage = ({ imageSrc, height, width, title, subtitle, children }) => {
    return (<>
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3" >
                <img src={imageSrc} alt="emphasis" height={height} width={width} />
                <h1 className="text-body-emphasis mt-4">{title}</h1>
                <p className="col-lg-8 mx-auto fs-5 text-muted">{subtitle}</p>
                <div className="d-inline-flex gap-2 mb-5">
                    <>{children}</>
                </div>
            </div>
        </div>
    </>);
}

const OutageNotFound = () => {
    return (<>
        <BigMessage title="Perturbation introuvable !" imageSrc="/imgs/no-results.svg" height={300}>
            <p className="col-lg-8 mx-auto fs-5 text-muted">Aucun dysfonctionnement ne correspond à votre recherche</p>
            <div className="d-flex gap-2 mb-5">
                <a href="/" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">Retour à l'accueil</a>
            </div>
        </BigMessage>
    </>);
}

const PageNotFound = () => {
    const navigate = useNavigate();
    function goBack() {
      navigate(-1);
    }
    function goHome() {
      navigate(useConfig().get(Parameters.HOME_URL));
    }
    return (
        <BigMessage title={'Page non trouvée !'}>
            <p className="lead mb-4">The page you are looking for does not exists.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={goBack}>Go Back</button>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={goHome}>Homepage</button>
            </div>
        </BigMessage>
    )
}

export { BigMessage, OutageNotFound, PageNotFound }


