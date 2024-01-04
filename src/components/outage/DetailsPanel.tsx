import { useMemo, } from "react";
import { OutageRecord } from "src/hooks/backend/useOutage";
import { ToBeDefined } from "src/types/common";


interface DetailsPanelProps {
    outage: OutageRecord & {incident: ToBeDefined}
}

const DetailsPanel = (props: DetailsPanelProps) => {

    const items = useMemo(() => {
        try {
            const items: Item[] = [];

            const addItem = (label: string, value: string, defaultValue?: string): void => {
                items.push({
                    label: label,
                    value: value || defaultValue || ""
                })
            }

            const parse = (obj: { [x: string]: string }, values: string[], labels: string[], defaults: string[]) => {
                if (obj) {
                    for (let index = 0; index < values.length; index++) {
                        try {
                            const propName = values[index];
                            const propValue = obj[propName];
                            addItem(
                                labels[index] ? labels[index] : propName,
                                propValue,
                                defaults[index] ? defaults[index] : undefined
                            )
                        } catch (e) {
                            console.log(e);
                        }


                    }
                }
            }

            //service
            parse(
                props.outage.service,
                ['name', 'criticy', 'range'],
                ['Business service', 'Criticité', 'Plage de service'],
                ['non déterminé', 'C3', 'inconnue']
            )

            //incident
            if (props.outage.incident) {
                parse(
                    props.outage.incident,
                    ['number', 'priority', 'ttr'],
                    ['Référence', 'Priorité', 'Time to resolve (TTR)'],
                    ['non définie', 'P3', 'non calculé']
                );
            }

            //details
            //NEXT: parse details

            return items

        } catch (e) {
            console.error(e);
        }
    }, [props.outage])

    return (<>
        {items ?
            <DetailsPanelDumb items={items} />
            :
            <></>}
    </>)
}

interface Item {
    label: string,
    value: string

}

interface DetailsPanelDumbProps {
    items: Item[]
}

const DetailsPanelDumb = (props: DetailsPanelDumbProps) => {
    return (<>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5>Informations techniques</h5>
            <ul className="list-group list-group-flush">
                {props.items.map(item =>
                    <li key={item.label} className="list-group-item">
                        <div key={item.label} className="hstack gap-3">
                            <span className="name text-secondary">{item.label}</span>
                            <span className="value ms-auto">{item.value}</span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    </>)
}

export { DetailsPanel }