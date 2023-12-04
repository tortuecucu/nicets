import moment from "moment/moment"
moment.locale('fr');

function Maintenance({ outage }) {
    console.log(outage)
    return (<>
        <div className="my-3 p-4 bg-body rounded shadow-sm">
            <h3>Maintenance en cours de {outage.service.name}</h3>

            <div className="d-flex flex-row mb-3 mt-3">
                <div className="">
                    <img src="/assets/maintenance.jpeg"></img>
                </div>
                <div className="mt-3">
                    <p className="lead mb-4">{outage.description}</p>
                    <h6 className="mt-3">Description</h6>
                    <ul>
                        <li>Statut : {outage.status.label}</li>
                        <li>Début planifié : <FormattedDate date={outage.maintenance.plannedStart} /></li>
                        <li>Fin planifiée : <FormattedDate date={outage.maintenance.plannedStart} /></li>
                    </ul>
                    <h6 className="mt-3">Qu'est ce qu'une maintenance ?</h6>
                    <p className="mb-0">Une maintenance est un arrêt programmé d'un service ou d'une application.</p>
                    <p>Son but est d'améliorer la qualité du service, en améliorant ses fonctionnalités ou sa disponibilité.</p>

                    <h6 className="mt-3">Que dois-je faire ?</h6>
                    <p className="mb-0">Aucune action n'est attendue de votre part.</p>
                    <p>L'arrêt du service ayant été programmé, il n'est pas nécessaire d'appeler de Helpdesk pour le signaler.</p>
                </div>
            </div>          

        </div>
    </>)
}

const FormattedDate = ({date}) => {
    return (<>
        <span className="formatted-date">            
            <span className="fw-medium">{moment(new Date(Date.parse(date))).format('LLL')}</span>
            <span className="ago ms-1 text-secondary">({moment(new Date(Date.parse(date))).fromNow()})</span>  </span>
    </>)
}

export default Maintenance;