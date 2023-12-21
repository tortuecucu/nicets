import { OutageRecord } from "src/hooks/backend/useOutage"

type ImpactPanelProps = {
    outage: OutageRecord
}

const ImpactPanel = (props: ImpactPanelProps) => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="mb-4">Impact déclaré par le management</h5>
            <h6 className="mb-1">Impacts clients</h6>
            <div className=" rounded m-2 p-2 bg-danger-subtle shadow-sm">
                <div className="hstack text-danger-emphasis">
                    <strong className="client">Rolls-Royce Gmbh</strong>
                    <small className="direction ms-auto">Direction Technique</small>
                </div>
                <p className="m-0 fw-light">Livraison des essais feu TLR-6 au 15/08/2023</p>
            </div>

            <h6 className="mt-4 mb-1">Impacts opérationnels</h6>
            <p className="text-muted p-1">Aucun impact opérationnel n'a encore été déclaré.<br></br>Faites le dès maintenant !</p>
            <hr className="hr" />
            <div className="hstack">
                <a href={'/impact/'+props.outage.id} className="btn btn-outline-secondary btn-sm ms-auto">Demander une escalation</a>
                <a href={'/impact/'+props.outage.id}   className="btn btn-outline-primary btn-sm ms-2">Je complète les impacts</a>
            </div>
        </div>
    )
}

export {ImpactPanel}