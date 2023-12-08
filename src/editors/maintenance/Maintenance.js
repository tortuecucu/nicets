import { useForm } from "react-hook-form"
import { useList } from "../../hooks/custom/useList";
import { TableList } from "../../components/form/ListEdit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";
import dayjs from "dayjs";
import { Status } from "../components/Status";
import { WrappedService } from "../components/Service";
import { DateTime } from "../components/DateTime";
import { Wrapper } from "../components/Wrapper";
import { ToastContext } from "../../pages/Layout";
import { useContext } from "react";
import "./maintenance.css"

const TEMPLATE = {
    id: null,
    outageId: null,
    plannedStart: dayjs().toISOString(),
    plannedEnd: dayjs().add(7, 'day').toISOString(),
    changeNumber: null,
    outage: {
        id: null,
        serviceId: null,
        description: null,
        shortDescription: null,
        typeId: 3,
        statusId: 1,
        startAt: dayjs().toISOString(),
        endAt: dayjs().add(7, 'day').toISOString()
    }
}

const MaintenanceEditor = () => {
    const errorCallback = (item, action) => {
        showToast({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue', life: 3000 });
        console.warn(item, action)
    }
    const api = useApi()
    const [services, setServices] = useState([])
    const {items, addItem, updateItem, deleteItem, addDefaultHandler, updateDefaultHandler, deleteDefaultHandler} = useList('maintenance', {
        onError: errorCallback
    });
    const [editedItem, setEditedItem] = useState(null);
    const { showToast } = useContext(ToastContext);

    const getServiceName = (id) => {
        if (services) {
            const service = services.find(i => i.id === id)
            if (service) {
                return service.name
            } else {
                return '---'
            }
        } else {
            return '---'
        }
    }

    const COLUMNS = [
        {
            property: 'outage.id',
            label: '#',
            formatter: (v) => { return v }
        },
        {
            property: 'outage.shortDescription',
            label: 'Description',
            formatter: (v) => { return <span title={v}>{(v && v.length < 150) ? v : String(v).substring(0, 150) + '...'}</span> }
        },
        {
            property: 'outage.serviceId',
            label: 'Service',
            formatter: (v) => { return getServiceName(v) }
        },
        {
            property: 'plannedStart',
            label: 'Début Planifié',
            formatter: (v) => { return dayjs(v).format('DD/MM/YYYY HH:mm') }
        }
    ]

    useEffect(() => {
        const fetchServices = async () => {
            const [resp, err] = await api.getServiceCatalog()
            if (err) {
                console.error(err)
            } else {
                setServices([
                    ...resp
                ])
            }
        }
        fetchServices()
    }, [])

    const updateCallback = (item) => {
        setEditedItem(item);
    }

    const addCallback = () => {
        setEditedItem(null);
    }

    const addHandler = (item) => {
        addDefaultHandler(item)
    }

    const deleteHandler = (item) => {
        deleteDefaultHandler(item)
    }

    const updateHandler = (item) => { 
        updateDefaultHandler(item)
    }

    return (<>
        <div className="bg-primary p-2 rounded shadow my-4">
            <div className="hstack">
                <h4 className="mb-3 text-white">Maintenances actives</h4>
                <Button className="ms-auto btn-outline-light" onClick={addCallback}>Ajouter</Button>
            </div>
            <div className="maintenances">
                <TableList items={items} onAdd={addCallback} onDelete={deleteHandler} onUpdate={updateCallback} columns={COLUMNS} />
            </div>
        </div>
        <MaintenanceForm item={editedItem} onAdd={addHandler} onUpdate={updateHandler} template={TEMPLATE} />
    </>)
}

const MaintenanceForm = ({ item, onAdd, onUpdate, template }) => {
    const { register, handleSubmit, reset, control } = useForm();

    useEffect(() => {
        if (item) {
            reset(item)
        } else {
            reset(template)
        }
    }, [item])

    const onSubmit = (data) => {
        console.info(data)

        if (item && item.outage.id) {
            onUpdate({
                ...item,
                ...data
            })
        } else {
            onAdd({
                ...template,
                ...data
            });
            reset(template);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded shadow p-4">
                <h3 className="mb-3">{item ? 'Modifier une maintenance' : 'Ajouter une maintenance'}</h3>
                <div className="bg-body-tertiary px-4 pb-4 rounded shadow-sm ">
                    <h4 className="pt-3">Infos Générales</h4>
                    <div className="row pb-3">
                        <WrappedService control={control} name='outage.serviceId' className='col col-6' id='serviceId' label='Business Service' text='service affecté par cette maintenance' />
                        <Wrapper className='col col-6' id='status' label='Statut'>
                            <Status id='status' control={control} name='outage.statusId' />
                        </Wrapper>
                    </div>
                    <Wrapper id='title' className='pb-3' label="Nom de l'opération" text='Nom qui apparaitra dans les listes de perturbations'>
                        <input id='title' className="form-control" placeholder="titre" {...register("outage.shortDescription", { required: true })} />
                    </Wrapper>
                    <Wrapper id='desc' label='Description' text='La description apparaîtra dans la page dédiée à cette maintenance'>
                        <textarea id='desc' className="form-control" rows={4} placeholder="description" {...register("outage.description", { required: true })} />
                    </Wrapper>
                    <Wrapper id='change' label='Numéro du change' text='Optionnel. Référence du change validé en CAB'>
                        <input id='change' className="form-control" placeholder="change" {...register("changeNumber")} />
                    </Wrapper>
                </div>
                <div className="bg-body-tertiary px-4 pb-4 rounded shadow-sm mt-4">
                    <h4 className="pt-3">Planification de la maintenance</h4>
                    <div className="row">
                        <Wrapper className='col col-3' id='plannedStart' label='Début planifié'>
                            <DateTime className="form-control" id='plannedStart' control={control} name='plannedStart' placeholder='début planifié' />
                        </Wrapper>
                        <Wrapper className='col col-3' id='plannedEnd' label='Fin planifiée'>
                            <DateTime id='plannedEnd' className="form-control" control={control} name='plannedEnd' placeholder='fin planifiée' />
                        </Wrapper>
                        <Wrapper className='col col-3' id='startAt' label='Début réel'>
                            <DateTime id='startAt' className="form-control" control={control} name='startAt' placeholder='début réel' />
                        </Wrapper>
                        <Wrapper className='col col-3' id='endAt' label='Fin réelle'>
                            <DateTime id='endAt' className="form-control" control={control} name='endAt' placeholder='fin réelle' />
                        </Wrapper>
                    </div>
                </div>
                <input type="submit" className="m-4 mb-0 btn btn-primary btn-lg ms-auto" />
            </div>
        </form>
    )
}

export default MaintenanceEditor