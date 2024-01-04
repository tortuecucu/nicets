import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "src/components/utils/Error";
import { OutageFields } from "src/types/outage";
import { useNavigate } from "react-router-dom";

interface OutageSummaryProps {
    outage: OutageFields,
    fullHeight?: boolean
}

function OutageSummary(props: OutageSummaryProps) {
    const {outage} = props

    const gotoOutage = () => {
        const navigate = useNavigate()
        navigate(`/outage/${outage.id}`)
    }

    return (
        <>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                {outage &&
                    <div className={"my-3 p-3 bg-body rounded shadow-sm"}>
                        <h6 className="pb-2 mb-4">{outage.description}</h6>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <h6 className="my-0">Durée</h6>
                                <small>-- heures -- minutes</small>
                            </li>
                            <li className="list-group-item">
                                <h6 className="my-0">Impact</h6>
                                <small>--- utilisateurs affectés</small>
                            </li>
                            <li className="list-group-item">
                                <h6 className="my-0">Type</h6>
                                <small>{'outage.type.label'}</small>
                            </li>
                            <li className="list-group-item">
                                <h6 className="my-0">Description</h6>
                                <small>{outage.description}</small>
                            </li>
                        </ul>
                        <small className="d-block text-center mt-3">
                            <a className="link-underline-light" onClick={gotoOutage}>Voir toutes les données sur l'incident</a>
                        </small>
                    </div>
                }
            </ErrorBoundary>
        </>
    );
}
OutageSummary.defaultProps = {
    fullHeight: false
}

export {OutageSummary}