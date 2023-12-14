import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToBeDefined } from 'src/types/common';

type FactorsSelectProps = {
    registerHook: ToBeDefined
}

const FactorsSelect = (props: FactorsSelectProps) => {
    const { registerHook } = props
    const [otherVisible, setOtherVisible] = useState(true);

    const otherCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherVisible(!e.target.checked)
    }

    return (<>
            <div className='p-4'>
                <h5 className=''>Qu'est-ce que nous devons améliorer ?</h5>
                <div key={`default-checkbox`} className="my-3">
                    <Form.Check {...registerHook("service")} type='checkbox' id='service' label='La qualité du service ' className='fw-semibold' />
                    <span className='ms-4 text-secondary text-muted'>Les fonctions ou la performance du service ne correspondent pas à mon besoin</span>
                    <Form.Check {...registerHook("recurrence")} type='checkbox' id='recurrence' label='La fiabilité du service' className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>Le service est trop souvent indisponible</span>
                    <Form.Check {...registerHook("information")} type='checkbox' id='information' label="Je n'ai pas été assez informé(e)" className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>Je n'ai pas été correctement informé pendant l'arrêt du service</span>
                    <Form.Check {...registerHook("leadtime")} type='checkbox' id='leadtime' label="Durée d'interruption trop longue" className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>description </span>
                    <Form.Check {...registerHook("other")} type='checkbox' id='other' label='Autre' onChange={otherCallback} className='fw-semibold mt-2' />
                    <Form.Control {...registerHook("otherText")} hidden={otherVisible} id="otherText" size='sm' className='ms-4' placeholder="précisez" maxLength={200} />
                </div>
            </div>
    </>
    );
}

export {FactorsSelect}