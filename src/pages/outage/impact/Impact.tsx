import { useParams } from 'react-router-dom';
import { IncidentSearcher } from "./IncidentSearcher";
import { ImpactWizard } from "./ImpactWizard";
import { useResponseContext } from "src/components/puller/DataPuller";
import { OutageType } from "src/types/outage";
import { useOutage } from 'src/hooks/backend/useOutage';
import { useState } from 'react';
import { useMount } from 'src/hooks/custom/useMount';
import { RenderOne } from 'src/components/utils/Render';
import { OutageFetcher } from 'src/components/outage/OutageFetcher';

const Impact = () => {
    const { id: dirtyId } = useParams();
    const {isValidRef, getOutageId} = useOutage()
    const [id, setId] = useState<number>(0)

    const handleRefChange = async (ref: string) => {
        const [lookup, _] = await getOutageId(ref)
        if (lookup) {
            setId(lookup)
        } else {
            setId(0)
        }
    }

    useMount(async ()=>{
        if (dirtyId && !Number.isNaN(Number(dirtyId))) {
            setId(+dirtyId)
        } else if (dirtyId) {
            handleRefChange(dirtyId)
        }
    })

    const refChange = (ref: string) => {
        if (isValidRef(ref)) {
            handleRefChange(ref)
        }
    }

    return (
        <>
            <RenderOne>
                <RenderOne.Render condition={(id === 0)}>
                    <IncidentSearcher onChange={refChange} />
                </RenderOne.Render>
                <RenderOne.Render condition={(id !== 0)}>
                    <OutageFetcher id={id}>
                        <ImpactContent />
                    </OutageFetcher>
                </RenderOne.Render>
            </RenderOne>
        </>
    );
};

const ImpactContent = () => {
    const {data} = useResponseContext<OutageType>()
    return(<>
        <ImpactWizard outage={data} />
    </>)
}

export default Impact;