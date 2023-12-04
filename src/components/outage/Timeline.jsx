import { Timeline } from "primereact/timeline";
import { useState, useMemo, useEffect } from "react";
import { useApi } from "../../contexts/ApiProvider";
import ReactTimeAgo from "react-time-ago";

const TimelinePanel = ({ outage }) => {
    const api = useApi();
    const [milestones, setMilestones] = useState(null);
    const [events, setEvents] = useState(null);

    const opposite = (item) => {
        return item.name
    }

    const content = (item) => {
        return <small onClick={clickCallback} className="text-color-secondary"><ReactTimeAgo date={item.date} /> </small>
    }

    useEffect(() => {
        async function fetchData() {
            const outageId = outage.id;
            const [milestones, err] = await api.getOutageMilestones(outageId);
            if (err) {
                console.error(err);
            } else {
                setMilestones(milestones);
            }
        }
        fetchData();
    }, [outage]);

    useMemo(() => {
        if (milestones) {
            var items = milestones.map(event => {
                return {
                    name: event.label,
                    date: new Date(event.occured)
                }
            });
            setEvents(items);

            items.sort(function (a, b) {
                return a.date - b.date;
            });
        }
    }, [milestones]);

    function clickCallback() {

    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm mb-4">
            <h5 className="mb-3">Chronogramme</h5>
            {events ?
                <Timeline align="right" value={events} opposite={opposite} content={content} />
                :
                <p>Pas encore de données à afficher</p>
            }
        </div>
    )
};

export {TimelinePanel}