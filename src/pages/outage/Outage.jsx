import "./outage.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../contexts/ApiProvider";
import { ErrorBoundary } from "react-error-boundary";
import Incident from "./Incident";
import Maintenance from "./Maintenance";
import Prealert from "./Prealert";
import { PageLoader } from "../../components/utils/PulseLoader";
import { ErrorFallback } from "../../components/utils/Error";
import { OutageNotFound } from "../../components/utils/BigMessages";

const Outage = () => {
    const api = useApi();
    const { id } = useParams();
    const [outage, setOutage] = useState(null);
    const [loaded, setLoaded] = useState(false);


    const resetCallback = () => {
        setOutage(null);
        setLoaded(false);
    }

    const getTypeId = () => {
        try {
            return outage ? outage.typeId : null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    useEffect(() => {
        try {
            (async () => {
                const [outage, err] = await api.getOutageByID(id);
                if (err) {
                    console.error(err);
                } else {
                    setOutage(outage);
                }
                setLoaded(true);
            })();
        } catch (e) {
            console.error(e);
        } 
    }, [id]);

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetCallback}>
                {loaded===false && <PageLoader />}
                {(loaded && !outage) && <OutageNotFound />}
                {(loaded && getTypeId() === 2) && <Prealert outage={outage} />}
                {(loaded && getTypeId() === 3) && <Maintenance outage={outage} />}
                {(loaded && [1, 4, 5].includes(getTypeId())) && <Incident outage={outage} />}
            </ErrorBoundary>
        </>
    );
};


export default Outage;