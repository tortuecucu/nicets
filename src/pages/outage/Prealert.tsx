import { OutageRecord } from "src/hooks/backend/useOutage";
import { UnfinishedFeature } from "../../components/utils/Alerts";

type PrealertProps = {
    outage: OutageRecord
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