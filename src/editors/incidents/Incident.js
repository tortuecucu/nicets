import { useEffect, useState, useContext } from "react"
import { useApi } from "../../contexts/ApiProvider"
import { useList } from "../../hooks/useList";
import { TableList } from "../../components/form/ListEdit";
import { Button } from "react-bootstrap";
import { ToastContext } from "../../pages/Layout";
import dayjs from "dayjs";
import './incident.css'
import { IncidentForm } from "./Form";

const IncidentList = ({ items, onAdd, onDelete, onUpdate, columns }) => {
    return (
        <div className="bg-primary p-2 rounded shadow my-4">
            <div className="hstack">
                <h4 className="mb-3 text-white">Incidents actifs</h4>
                <Button className="ms-auto btn-outline-light" onClick={onAdd}>Ajouter</Button>
            </div>
            <div className="incidents">
                <TableList items={items} onAdd={onAdd} onDelete={onDelete} onUpdate={onUpdate} columns={columns} />
            </div>
        </div>
    )
}

const TEMPLATE = {
    id: null,
    number: null,
    ttr: null,
    priority: 2,
    outage: {
        id: null,
        serviceId: null,
        description: null,
        typeId: 1,
        statusId: 2,
        shortDescription: null,
        startAt: dayjs().toISOString(),
        endAt: null
    }
}

const IncidentEditor = () => {
    const { showToast } = useContext(ToastContext);
    const api = useApi();

    const errorCallback = (item, action) => {
        showToast({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue', life: 3000 });
        console.warn(item, action)
    }

    const [services, setServices] = useState([])
    const {items, addDefaultHandler, updateDefaultHandler, deleteDefaultHandler} = useList('incident', {
        onError: errorCallback
    });
    const [editedItem, setEditedItem] = useState({...TEMPLATE});

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
            property: 'outage.serviceId',
            label: 'Service',
            formatter: (v) => { return getServiceName(v) }
        },
        {
            property: 'outage.typeId',
            label: 'Type',
            formatter: (v) => {return api.outageTypeLabel(v)}
        },
        {
            property: 'outage.statusId',
            label: 'Statut',
            formatter:  (v) => {return api.outageStatusLabel(v)}
        },
        {
            property: 'outage.shortDescription',
            label: 'Description',
            formatter: (v) => { return <span title={v}>{(v && v.length < 150) ? v : String(v).substring(0, 150) + '...'}</span> }
        },

        {
            property: 'outage.startAt',
            label: 'Début',
            formatter: (v) => { return dayjs(v).format('DD/MM/YYYY HH:mm') }
        },
        {
            property: 'number',
            label: 'Référence',
            formatter: (v) => {return String(v).toUpperCase()}
        },
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
        setEditedItem({
            ...TEMPLATE
        });
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

    return (
        <>
            <IncidentList items={items} onAdd={addCallback} onDelete={deleteHandler} onUpdate={updateCallback} columns={COLUMNS} />
            <IncidentForm item={editedItem} onAdd={addHandler} onUpdate={updateHandler} template={TEMPLATE} />
        </>
    )
}

export default IncidentEditor