import { UnfinishedFeature } from "../../components/utils/Alerts";

function Prealert({outage}) {
    return(
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h3>Pré-alerte</h3>
            <UnfinishedFeature />
        </div>
        </>
    )
}

export default Prealert;