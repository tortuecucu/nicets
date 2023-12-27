
import { EmptyPlaceholder } from "../utils/Empty";
import useDate from "src/hooks/backend/useDate";
import { Render } from "../utils/Render";
import { OutageRecord } from "src/hooks/backend/useOutage";
import { useNavigate } from "react-router-dom";
import useOutageEvent from "src/hooks/backend/useOutageEvent";
import { TitledContent } from "../utils/TitledContent";

interface Item {
    id: Number,
    title: String,
    description: String,
    createdAt: string
}

const NewsPanel = (props: { outage: OutageRecord }) => {
    const { events } = useOutageEvent(props.outage.id);

    const items = events.map(event => {
        return {
            id: event.id,
            title: event.label || event.eventtype?.label || 'Nouvel évènement',
            description: event.description || event.eventtype?.description || 'Nouvel évènement',
            createdAt: event.occured
        }
    })

    return (
        <NewsPanelDumb items={items} outage={props.outage} />
    )
};

const NewsPanelDumb = (props: { items: Item[], outage: OutageRecord }) => {
    const { items } = props;
    const navigate = useNavigate();

    const handleNotify = () => {
        navigate('/notify/' + props.outage.id);
    }

    return (
        <TitledContent title="Dernières informations" divClass="my-3 p-4 bg-body rounded shadow-sm" level={4}>
            <Render condition={items && Array.isArray(items) && items.length > 0} fallback={<EmptyPlaceholder />}>
                <>
                    <div className="list-group list-group-flush mb-4">
                        {items.map(item => <NewsItem item={item} />)}
                    </div>
                    <hr className="hr" />
                    <div className="hstack">
                        <a onClick={handleNotify} className="btn btn-outline-secondary btn-sm ms-auto">S'abonner aux notifications</a>
                    </div>
                </>
            </Render>
        </TitledContent>
    )
}

const NewsItem = (props: { item: Item }) => {
    const { item } = props;
    const { ago } = useDate()
    return (
        <div key={item.id.toString()} className="list-group-item list-group-item-action d-flex gap-3 py-3">
            <img src="/imgs/thunder.svg" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"></img>
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 className="mb-0">{item.title}</h6>
                    <p className="mb-0 opacity-75">{item.description}</p>
                </div>
                <small className="opacity-50 text-nowrap">{ago(item.createdAt)}</small>
            </div>
        </div>
    )
}

export { NewsPanel }