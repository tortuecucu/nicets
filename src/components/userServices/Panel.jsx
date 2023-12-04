import { useState, useMemo, useRef, useEffect, createContext } from "react";
import { Toast } from 'primereact/toast';
import { useApi } from '../../contexts/ApiProvider';
import ServiceList from "./List";

const ServiceContext = createContext();

const ServicePanel = () => {
    return (<>
        <h3 className="mb-3 fw-normal">Vos applications & Services</h3>
        <ServiceManager />
    </>)
}

const ServiceManager = () => {
    const toast = useRef();
    const api = useApi();
    const [fullCatalog, setFullCatalog] = useState([]);
    const [availableCatalog, setAvailableCatalog] = useState([]);
    const [customList, setCustomList] = useState([]);
    const [coreList, setCoreList] = useState([])
    const [showSave, setShowSave] = useState(false);

    const newSubstription = (service) => {
        return {
            id: null,
            userId: null,
            notify: true,
            rank: null,
            serviceId: service.id,
            service: service
        }
    }

    //get the service catalog
    useEffect(() => {
        async function fetchData() {
            const [catalog, err] = await api.getServiceCatalog();
            if (err) {
                console.error('catalog', err);
            } else {
                setFullCatalog([...catalog]);
            }
        }
        fetchData();
    }, []);

    // get the list of services already selected by current user
    useEffect(() => {
        async function fetchData() {
            const [data, err] = await api.getUserServices();

            if (err) {
                console.error(err);
            } else if (Array.isArray(data) && data.length > 0) {
                setCustomList([
                    ...data.filter((e) => e.service.isCore === false)
                ]);
                setCoreList([
                    ...data.filter((e) => e.service.isCore === true)
                ]);

            } else if (fullCatalog.length > 0) { //current user never select services, so populate the core list with catalog
                const cores = fullCatalog.filter((e) => e.isCore === true);
                setCoreList([
                    ...cores.map(svc => newSubstription(svc))
                ]);
            }
        }
        fetchData();
    }, [fullCatalog]);

    //removes items from catalog if exists on core or custom list
    useMemo(() => {
        if (availableCatalog.length === 0) {
            setAvailableCatalog([
                ...fullCatalog.filter((e) => e.isCore === false)
            ]);
        }
    }, [fullCatalog])


    const loaded = useMemo(() => {
        return fullCatalog && customList && coreList
    }, [fullCatalog, customList, coreList]);

    const onChanged = () => {
        setShowSave(true);
    }

    const saveCallback = async () => {

        //create payload and update subscriptions rank according to order
        const payload = [
            ...customList,
            ...coreList
        ].map((s, i) => {
            s.rank = i
            return s
        })

        const [saved, err] = await api.saveUserServices(payload);

        if (err) {
            console.error(err);
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'enregistrer vos modifications', life: 3000 });
            setShowSave(false);
            return false;
        } else if (saved) {
            toast.current.show({ severity: 'success', summary: 'Merci', detail: 'Vos modifications sont sauvegardées', life: 3000 });
            setShowSave(false);
            return true;
        } else {
            toast.current.show({ severity: 'error', summary: 'Oops', detail: 'Impossible d\'enregistrer vos modifications', life: 3000 });
            return false;
        }
    }

    const addFromCatalog = (service) => {
        //add to custom list
        setCustomList([
            ...customList,
            newSubstription(service)
        ])

        //remove from catalog
        setAvailableCatalog(
            availableCatalog.filter(s => s.id !== service.id)
        );

    }

    const onDelete = async (subscription) => {
        //call api only for subscriptions registered in DB
        if (subscription && subscription.id) {
            const deleted = await api.deleteUserService(subscription.id);
            if (!deleted) {
                console.warn('subscription not deleted!', subscription);
            }
        }
    }

    return (
        <ServiceContext.Provider value={{ customList, coreList, availableCatalog, addFromCatalog, setAvailableCatalog }}>
            <h4 className='mt-5'>Vos applications</h4>
            <p className='fw-light text-secondary'>Ajoutez vos applications, plus classez-les suivant leur importance pour vos activités</p>
            <ServiceList listName={'customList'} editable={true} onChanged={onChanged} setList={setCustomList} deleteCallback={onDelete}></ServiceList>
            <h4 className='mt-5'>Services essentiels</h4>
            <ServiceList listName={'coreList'} editable={false} onChanged={onChanged} setList={setCoreList} deleteCallback={onDelete}></ServiceList>
            {showSave && <SaveWarningPanel className="mt-4" callback={saveCallback} />}
            <Toast ref={toast} />
        </ServiceContext.Provider>
    )

}

const SaveWarningPanel = ({ visible = true, callback, className }) => {
    return (
        <>
            {visible &&
                <div className={`save p-2 bg-warning-subtle rounded hstack align-middle ${className}`}>
                    <span className="h-100 align-middle text-warning-emphasis">Sauvegardez vos modifications avant de quitter cette page</span>
                    <button onClick={callback} className="btn btn-warning ms-auto">Enregistrer</button>
                </div>
            }
        </>
    )
}

export { ServicePanel, ServiceContext };