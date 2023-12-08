import type { OutageSingleProp } from "./OutageItem";
import {useMemo} from 'react'

//TODO: refactor this module
function ItemAction(props: OutageSingleProp) {

    const { name, label }: { name: string | undefined, label: string | undefined } = useMemo(() => {
        try {
            var fname: string | undefined
            var flabel: string | undefined
            if ([1, 4, 5].includes(props.outage.typeId)) {
                switch (props.outage.statusId) {
                    case 1:
                        fname = 'helpdesk';
                        flabel = 'Appeler le HD';
                        break;
                    case 2:
                    case 3:
                        fname = 'affected';
                        flabel = 'Affecté(e) ?';
                        break;
                    case 4:
                        fname = 'nominal';
                        flabel = 'Résolu ?';
                        break;
                    case 5:
                        fname = 'workaround';
                        flabel = 'Rétabli ?';
                        break;
                    case 6:
                        fname = 'feedback';
                        flabel = 'Satisfait(e) ?';
                        break;
                    default:
                        fname = 'helpdesk';
                        flabel = 'Appeler le HD';
                        break;
                }
            }
            return {
                name: fname,
                label: flabel
            }
        } catch (e) {
            console.error(e);
            return {
                name: undefined,
                label: undefined
            }
        }
    }, [props.outage])

    return (<>
        {(name !== undefined && label !== undefined) && <a id="outageCta" className="btn btn-primary w-100 action">{label}</a>}
    </>)
}

export {ItemAction}