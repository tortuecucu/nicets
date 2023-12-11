import { ImpactPanel, AffectedPanel, ActionPanel } from "../../components/outage/OutageCommon";
import { UnfinishedFeature } from "../../components/utils/Alerts";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../components/utils/Error";
import { Header, Tracker, SubHeader } from "../../components/outage/Header";
import { TimelinePanel } from "../../components/outage/Timeline";
import { DetailsPanel } from "../../components/outage/DetailsPanel";
import { NewsPanel } from "../../components/outage/NewsPanel";
import { Outage } from "src/types/outage";
import { useOutage } from "src/hooks/backend/useOutage";
import { Render } from "src/components/utils/Render";

type OutageProps = {
    outage: Outage
}

function Incident(props: OutageProps) {
    const { isEnded } = useOutage()

    return (
        <Render condition={isEnded(props.outage) === false} fallback={<ClosedIncident outage={props.outage} />}>
            <ActiveIncident outage={props.outage} />
        </Render>
    )
}

const ActiveIncident = (props: OutageProps) => {
    return (
        <>
            <div className="">
                <ErrorBoundary fallback={<ErrorFallback />}>
                    <Header outage={props.outage}>
                        <Tracker outage={props.outage} />
                    </Header>
                    <SubHeader outage={props.outage} />
                </ErrorBoundary>
                <div className="row my-4">
                    <div className="col col-5">
                        <ErrorBoundary fallbackRender={ErrorFallback}>
                            <ActionPanel outage={props.outage} className={''} />
                            <ImpactPanel outage={props.outage} />
                            <TimelinePanel outage={props.outage} />
                            <DetailsPanel outage={props.outage} />
                        </ErrorBoundary>
                    </div>
                    <div className="col col-7">
                        <ErrorBoundary fallbackRender={ErrorFallback}>
                            <AffectedPanel outage={props.outage} />
                            <NewsPanel outage={props.outage} />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </>
    );
};

const ClosedIncident = (props: OutageProps) => {
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