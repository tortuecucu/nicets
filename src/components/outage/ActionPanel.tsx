import { OutageRecord } from "src/hooks/backend/useOutage";
import { useOutageSettings, FeedbackItem } from "src/hooks/backend/useOutageSettings";

type ActionPanelProps = {
    outage: OutageRecord,
    compact?: boolean,
    className?: string
}

const ActionPanel = (props: ActionPanelProps) => {
    const {getSetting} = useOutageSettings(props.outage)
    const settings = getSetting()

    return (<>
        {(settings && !props.compact) &&
            <div className="cta my-3 p-3 bg-body rounded shadow-sm ">
                <p className="title my-0">Rejoignez les 154 utilisateurs qui nous aident !</p>
                <p className="explanation fw-light">{settings.reason}</p>
                <ActionButtons choices={settings.feedback.choices} outage={props.outage}/>
            </div>
        }
        {(settings && props.compact) &&
            <div className={`hstack ${props.className}`}>
                <ActionButtons choices={settings.feedback.choices} outage={props.outage} />
            </div>
        }
    </>);
}

type ActionButtonsProps = {
    choices: FeedbackItem[],
    outage: OutageRecord
}

const ActionButtons = (props: ActionButtonsProps) => {
    return (<>
        {props.choices.map(choice =>
            <a key={choice.label} href={choice.href.replace('$id', props.outage.id.toString())} className={`btn me-3 btn-${choice.variant}`}>{choice.label}</a>
        )}
    </>)
}

export {ActionPanel}