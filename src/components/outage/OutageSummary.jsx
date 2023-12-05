function OutageSummary({ outage, fullHeight = false }) {
    const getVal = (val, defaultVal = null) => {
        try {
            return val
        } catch (e) {
            console.error(e)
            return defaultVal
        }
    }
    return (
        <>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                {outage &&
                    <div className={"my-3 p-3 bg-body rounded shadow-sm"}>
                        <h6 className="pb-2 mb-4">{getVal(outage.punchline)}</h6>
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
                                <small>{getVal(outage.type.label)}</small>
                            </li>
                            <li className="list-group-item">
                                <h6 className="my-0">Description</h6>
                                <small>{getVal(outage.description)}</small>
                            </li>
                        </ul>
                        <small className="d-block text-center mt-3">
                            <a className="link-underline-light" href={configData.HOME_URL + '/outage/' + getVal(outage.id, 0)}>Voir toutes les données sur l'incident</a>
                        </small>
                    </div>
                }
            </ErrorBoundary>
        </>
    );
}

export {OutageSummary}