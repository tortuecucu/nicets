import { ImpactPanel, AffectedPanel, ActionPanel } from "../../components/outage/OutageCommon";
import { UnfinishedFeature } from "../../components/utils/Alerts";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../components/utils/Error";
import { useMemo } from "react";
import { Header, Tracker, SubHeader } from "../../components/outage/Header";
import { TimelinePanel } from "../../components/outage/Timeline";
import { DetailsPanel } from "../../components/outage/DetailsPanel";
import { NewsPanel } from "../../components/outage/NewsPanel";

function Incident({ outage }) {
    const closed = useMemo(() => {
        try {
            return false  //FIXME:  (outage.status.phase === 2) ? false : true
        } catch (e) {
            console.error(e);
            return false
        }
    }, [outage])

    return (
        <>
            {closed === true && <ClosedIncident outage={outage} />}
            {closed === false && <ActiveIncident outage={outage} />}
        </>
    )
}

const ActiveIncident = ({ outage }) => {
    return (
        <>
            <div className="">
                <ErrorBoundary fallbackRender={ErrorFallback}>
                    <Header outage={outage}>
                        <Tracker outage={outage} />
                    </Header>
                    <SubHeader outage={outage} />
                </ErrorBoundary>
                <div className="row my-4">
                    <div className="col col-5">
                        <ErrorBoundary fallbackRender={ErrorFallback}>
                            <ActionPanel outage={outage} />
                            <ImpactPanel outage={outage} />
                            <TimelinePanel outage={outage} />
                            <DetailsPanel outage={outage} />
                        </ErrorBoundary>
                    </div>
                    <div className="col col-7">
                        <ErrorBoundary fallbackRender={ErrorFallback}>
                            <AffectedPanel outage={outage} />
                            <NewsPanel outage={outage} />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </>
    );
};

const ClosedIncident = ({ outage }) => {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h3>L'incident est clos !</h3>
                <UnfinishedFeature />
            </div>
        </>
    );
};

export default Incident;