import { Timeline } from "primereact/timeline";
import { EmptyPlaceholder } from "../utils/Empty";
import useOutageMilestone from "src/hooks/backend/useOutageMilestone";
import { TitledContent } from "../utils/TitledContent";
import { Render } from "../utils/Render";
import { OutageRecord } from "src/hooks/backend/useOutage";
import useDate from "src/hooks/backend/useDate";

type Item = {
    date: Date
    name: string,
    content: React.ReactElement
}

const TimelinePanel = (props: { outage: OutageRecord }) => {
    const { milestones } = useOutageMilestone(props.outage.id);
    const { parse, ago } = useDate();

    const items: Item[] = milestones.map(milestone => {
        return {
            date: parse(milestone.occured).toDate(),
            name: milestone.label || milestone?.milestone.label || 'Nouvel évènement',
            content: <small onClick={() => { }} className="text-color-secondary">{ago(milestone.occured)} </small>
        }
    })

    return (
        <TitledContent title="Chronogramme" divClass="my-3 p-3 bg-body rounded shadow-sm mb-4" level={5}>
            <Render condition={(items && Array.isArray(items) && items.length > 0)} fallback={<EmptyPlaceholder />}>
                <TimelineDumb items={items} />
            </Render>
        </TitledContent>
    )
};

const TimelineDumb = (props: { items: Item[] }) => {
    return (
        <Timeline align="right" value={props.items} opposite={(item) => item.name} content={(item) => item.content} />
    )
}

export { TimelinePanel }