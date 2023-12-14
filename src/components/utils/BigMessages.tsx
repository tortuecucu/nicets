import { To, useNavigate } from "react-router-dom";
import { Parameters, useConfig } from "../../hooks/config/useConfig";

type BigMessageProps = {
    imageSrc?: string,
    height?: number,
    width?: number,
    title: string,
    subtitle?: string,
    children?: React.ReactElement
}

const BigMessage = (props: BigMessageProps) => {
    return (<>
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3" >
                <img src={props.imageSrc} alt="emphasis" height={props.height} width={props.width} />
                <h1 className="text-body-emphasis mt-4">{props.title}</h1>
                <p className="col-lg-8 mx-auto fs-5 text-muted">{props.subtitle}</p>
                <div className="d-inline-flex gap-2 mb-5">
                    <>{props.children}</>
                </div>
            </div>
        </div>
    </>);
}

const OutageNotFound = () => {
    return (<>
        <BigMessage title="Perturbation introuvable !" imageSrc="/imgs/no-results.svg" height={300}>
            <>
                <p className="col-lg-8 mx-auto fs-5 text-muted">Aucun dysfonctionnement ne correspond à votre recherche</p>
                <div className="d-flex gap-2 mb-5">
                    <a href="/" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">Retour à l'accueil</a>
                </div>
            </>
        </BigMessage>
    </>);
}

const PageNotFound = () => {
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }
    function goHome() {
        navigate(useConfig().get(Parameters.HOME_URL) as To);
    }
    return (
        <BigMessage title={'Page non trouvée !'}>
            <>
                <p className="lead mb-4">The page you are looking for does not exists.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={goBack}>Go Back</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={goHome}>Homepage</button>
                </div>
            </>

        </BigMessage>
    )
}



export { BigMessage, OutageNotFound, PageNotFound }


