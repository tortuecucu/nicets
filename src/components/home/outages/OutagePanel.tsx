import { Spinner } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../utils/Error';
import MissingItem from '../../outage/MissingItem';
import { TitledContent } from '../../utils/TitledContent';
import { OutageListContextProvider, useOutageList } from '../../../hooks/backend/useOutageList';
import { OutageFilterController } from './OutageFilterController';

import "./outagepanels.css";

function OutagesPanel() {
    return (
        <>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                <OutageListContextProvider>
                    <TitledContent title='Perturbations en cours' titleClass='mb-0' level={4} lead='Liste les maintenances et les dysfonctionnements en cours' leadClass='fw-light text-secondary'>
                        <Loader />
                        <MissingItem className='mt-2' />
                    </TitledContent>
                </OutageListContextProvider>
            </ErrorBoundary>
        </>
    )
}

function Loader() {
    const { outages, isLoading } = useOutageList()

    return (
        <>
            {isLoading && <>
                <div className='hstack'>
                    <Spinner className='my-4' animation="border" variant="primary" />
                    <span className='ms-2 text-secondary'>Recherche des perturbations en cours...</span>
                </div>
            </>}
            {(!isLoading && outages.length > 0) && <OutageFilterController outages={outages} />}
            {(!isLoading && outages.length === 0) && <NoOutages />}
        </>
    )
}

function NoOutages() {
    return (
        <>Aucune perturbation à afficher</>
    )
}

export { OutagesPanel }