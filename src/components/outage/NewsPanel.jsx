import ReactTimeAgo from "react-time-ago";
import { useApi } from "../../contexts/ApiProvider";
import { useState, useMemo, useEffect } from "react";

const NewsPanel = ({ outage }) => {
    const [events, setEvents] = useState(null);
    const [news, setNews] = useState(null);
    const api = useApi();

    useEffect(() => {
        async function fetchData() {
            const outageId = outage.id;
            const [events, err] = await api.getOutageEvents(outageId);
            if (err) {
                console.error(err);
            } else {
                setEvents(events);
            }
        }
        fetchData();
    }, [outage]);

    useMemo(() => {
        if (events) {
            const items = events.map(event => {
                return {
                    title: event.label,
                    description: event.description,
                    created: event.occured
                }
            });
            items.sort(function (a, b) {
                return b.created - a.created;
            });
            setNews(items);
        }
    }, [events]);

    const renderItem = (item) => {
        return (
            <div key={item.id} className="list-group-item list-group-item-action d-flex gap-3 py-3">
                <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"></img>
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-0">{item.title}</h6>
                        <p className="mb-0 opacity-75">{item.description}</p>
                    </div>
                    <small className="opacity-50 text-nowrap"><ReactTimeAgo date={new Date(item.created)} /></small>
                </div>
            </div>
        )
    }

    return (
        <div className="my-3 p-4 bg-body rounded shadow-sm">
            <h4 className="mb-4">Dernières informations</h4>
            {news ?
                <div className="list-group list-group-flush mb-4">
                    {news && news.map(item => renderItem(item))}
                </div>
                :
                <p>Pas encore d'actualité publiée</p>
            }
            <hr className="hr" />
            <div className="hstack">
                <a href={'/notify/'+outage.id} className="btn btn-outline-secondary btn-sm ms-auto">S'abonner aux notifications</a>
            </div>
        </div>
    )
};

export {NewsPanel}