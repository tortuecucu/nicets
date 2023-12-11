import { Outage } from "src/types/outage";
import { UnfinishedFeature } from "../../components/utils/Alerts";

type PrealertProps = {
    outage: Outage
}

function Prealert(props: PrealertProps) {
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