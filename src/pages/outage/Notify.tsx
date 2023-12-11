import { useParams } from 'react-router-dom';
import { ErrorPanel } from "../../components/utils/Error";
import { useSubscription } from 'src/hooks/backend/useSubscription';
import { OutageSummary } from 'src/components/outage/OutageSummary';
import { DataManager, useResponseContext } from 'src/components/puller/DataPuller';
import { Render, RenderOne } from 'src/components/utils/Render';
import { OutageFetcher } from 'src/components/outage/OutageFetcher';
import { Outage } from 'src/types/outage';
import { useOutage } from 'src/hooks/backend/useOutage';
import { TitledContent } from 'src/components/utils/TitledContent';
import { useState } from 'react';

//TODO: add toast and relevevant messages

function SubscriptionClosed() {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">L'incident est clos</h6>
                <p className="lead">Plus aucune notification ne sera envoyée pour cet incident</p>
            </div>
        </>
    );
}

type ManageSubscriptionProps = {
    outage: Outage
}

type WizardProps = {
    outage: Outage
    optIn: boolean
}

type ConfirmProps = {
    onConfirmed: () => void
    title: string
}

const Confirm = (props: ConfirmProps) => {
    return(
        <TitledContent title={props.title} level={5}>
            <></>
        </TitledContent>
    )
}

const SuccessPanel = () => {
    return(<>Success !</>)
}

const Wizard = (props: WizardProps) => {
    const {manage} = useSubscription()
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

    const handleConfirm = () => {
        setIsConfirmed(true)
    }

    const processRequest = async (): Promise<boolean> => {
        const [success, error] = await manage(
            props.outage.id,
            props.optIn
        )
        if (error) {
            return false //TODO: toast
        } 
        return success as boolean
    }

    return(<>
        <RenderOne>
            <RenderOne.Render condition={(isConfirmed===false)}>
                <Confirm onConfirmed={handleConfirm} title='oups'/>
            </RenderOne.Render>
            <RenderOne.Render condition={(isConfirmed===true)}>
                <DataManager promise={processRequest} successFunc={(data) => data === true}>
                    <SuccessPanel />
                </DataManager>
            </RenderOne.Render>
        </RenderOne>
    </>)
}

const ManageSubscription = (props: ManageSubscriptionProps) => {
    const { value } = useParams();
    let optIn: boolean = false
    if (value) {
        optIn = [1, true, 'yes', 'oui', 'subscribe', '1'].includes(value as never)
    }
    
    return (<>
        <div className="row mb-4">
            <div className="col col-4 col-md-4">
                <OutageSummary outage={props.outage} />
            </div>
            <div className="col col-8 col-md-8">
                <div className="mt-3 mb-5 p-3 bg-body rounded shadow-sm h-100 ">
                    <Wizard outage={props.outage} optIn={optIn}/>
                </div>
            </div>
        </div>
    </>)
}

/**
 * Determine which content to display depends if the outage is ending or ongoing
 * @returns ReactElement
 */
const ContentChooser = () => {
    const { data } = useResponseContext()
    const { isEnded } = useOutage()
    const outage: Outage = data as Outage

    return (<>
        <Render condition={(!isEnded(outage))} fallback={<SubscriptionClosed />}>
            <ManageSubscription outage={outage} />
        </Render>
    </>)
}

const Notify = () => {
    const { id: dirtyId } = useParams();

    let id: number = 0
    if (typeof dirtyId === 'number') {
        id = dirtyId
    }

    //display content only if id url param is integer and corresponding outage exists in DB
    return (
        <Render condition={(id > 0)} fallback={<ErrorPanel />}>
            <OutageFetcher id={id}>
                <ContentChooser />
            </OutageFetcher>
        </Render>
    )
};

export default Notify;