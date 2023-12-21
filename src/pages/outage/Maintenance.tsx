import { FormattedDate } from "src/components/utils/FormattedDate";
import { OutageRecord } from "src/hooks/backend/useOutage";

type MaintenanceProps = {
    maintenance: OutageRecord
}

function MaintenancePage(props: MaintenanceProps) {
    return (<>
        <div className="my-3 p-4 bg-body rounded shadow-sm">
            <h3>Maintenance en cours de {props.maintenance.service.name}</h3>

            <div className="d-flex flex-row mb-3 mt-3">
                <div className="">
                    <img src="/assets/maintenance.jpeg"></img>
                </div>
                <div className="mt-3">
                    <p className="lead mb-4">{props.maintenance.description}</p>
                    <h6 className="mt-3">Description</h6>
                    <ul>
                        <li>Statut : {props.maintenance.status.label}</li>
                        <li>Début planifié : <FormattedDate date={props.maintenance.maintenance.plannedStart} /></li>
                        <li>Fin planifiée : <FormattedDate date={props.maintenance.maintenance.plannedEnd} /></li>
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

export default MaintenancePage;