import { useState, useMemo, useEffect } from "react";

const DetailsPanel = ({ outage }) => {
    const [items, setItems] = useState(null);

    useMemo(() => {
        try {
            const items = [];
            const add = (label, value, defaultValue) => {
                items.push({
                    label: label,
                    value: (value ? value : defaultValue)
                })
            }
            const parse = (obj, values, labels, defaults) => {
                if (obj) {
                    for (let index = 0; index < values.length; index++) {
                        try {
                            const propName = values[index];
                            const propValue = obj[propName];
                            add(
                                labels[index] ? labels[index] : propName,
                                propValue,
                                defaults[index] ? defaults[index] : null
                            )
                        } catch (e) {
                            console.log(e);
                        }


                    }
                }
            }

            //service
            parse(
                outage.service,
                ['name', 'criticy', 'range'],
                ['Business service', 'Criticité', 'Plage de service'],
                ['non déterminé', 'C3', 'inconnue']
            )

            //incident
            parse(
                outage.incident,
                ['number', 'priority', 'ttr'],
                ['Référence', 'Priorité', 'Time to resolve (TTR)'],
                ['non définie', 'P3', 'non calculé']
            );

            //details
            //NEXT: parse details

            setItems(items);

        } catch (e) {
            console.error(e);
        }
    }, [outage])

    return (<>
        {items ?
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h5>Informations techniques</h5>
                <ul className="list-group list-group-flush">
                    {items.map(item =>
                        <li key={item.label} className="list-group-item">
                            <div key={item.label} className="hstack gap-3">
                                <span className="name text-secondary">{item.label}</span>
                                <span className="value ms-auto">{item.value}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            :
            <></>}
    </>)
}

export {DetailsPanel}