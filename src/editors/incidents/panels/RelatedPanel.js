import { Button } from "react-bootstrap"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BoxArrowUpRight, PlusLg } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useList } from "../../../hooks/useList";
import { ToastContext } from "../../../pages/Layout";
import { CompactItem, CompactList, TableList } from "../../../components/form/ListEdit";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { useForm } from "react-hook-form"
import "./relatedpanel.css"
dayjs.extend(relativeTime)

const ago = (datetime) => {
    return dayjs(datetime).fromNow();
}

const formatDatetime = (datetime, format = 'DD/MM HH:mm') => {
    return dayjs(datetime).format(format)
}

const richDate = (datetime) => {
    return formatDatetime(datetime) + ' - ' + ago(datetime)
}

const relations = {
    milestones: {
        item: 'jalon',
        list: 'milestone',
        actions: ['enlarge', 'add'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'milestone.label',
                label: 'Nom',
                formatter: (v) => { return v }
            },
            {
                property: 'milestone.description',
                label: 'description',
                formatter: (v) => { return v }
            },
            {
                property: 'updatedAt',
                label: 'Mis à jour',
                formatter: (v) => { return richDate(v) }
            },
        ]
    },
    services: {
        item: 'service',
        list: 'service',
        actions: ['enlarge', 'add', 'edit', 'delete'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'label',
                label: 'Titre',
                formatter: (v) => { return v }
            },
            {
                property: 'occured',
                label: 'Il y a',
                formatter: (v) => { return v }
            },
        ]
    },
    events: {
        item: 'événement',
        list: 'event',
        actions: ['enlarge', 'add', 'edit', 'delete'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'label',
                label: 'Nom',
                formatter: (v) => { return v }
            },
            {
                property: 'description',
                label: 'Description',
                formatter: (v) => { return v }
            },
            {
                property: 'updatedAt',
                label: 'Mis à jour',
                formatter: (v) => { return richDate(v) }
            },
        ]
    },
    locations: {
        item: 'site',
        list: 'location',
        actions: ['enlarge', 'add', 'edit', 'delete'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'location.name',
                label: 'Site',
                formatter: (v) => { return v }
            },
            {
                property: 'outagerelation.label',
                label: 'Caractérisation',
                formatter: (v) => { return v }
            },
            {
                property: 'updatedAt',
                label: 'Mis à jour',
                formatter: (v) => { return richDate(v) }
            },
        ]
    },
    etas: {
        item: 'eta',
        list: 'eta',
        actions: ['enlarge', 'add', 'edit', 'delete'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'earliestEta',
                label: 'Eta',
                formatter: (v) => { return dayjs(v).format('DD/MM HH:mm') }
            },
            {
                property: 'confidence',
                label: 'Confiance',
                formatter: (v) => { return v + ' %' }
            },
            {
                property: 'createdAt',
                label: 'Créé',
                formatter: (v) => { return richDate(v) }
            },
        ]
    },
    details: {
        item: 'détail',
        list: 'detail',
        actions: ['enlarge', 'add', 'edit', 'delete'],
        columns: [
            {
                property: 'id',
                label: '#',
                formatter: (v) => { return v }
            },
            {
                property: 'property',
                label: 'Propriété',
                formatter: (v) => { return v }
            },
            {
                property: 'value',
                label: 'Valeur',
                formatter: (v) => { return v }
            },
            {
                property: 'updatedAt',
                label: 'Mis à jour',
                formatter: (v) => { return richDate(v) }
            },
        ]
    },
}

//TODO: use toasts
const RelatedPanel = ({ outage, relation, Form = null, noContent = <TextPlaceholder text="cette liste est vide" />, compactItem = CompactItem, newitemFactory }) => {
    const { showToast } = useContext(ToastContext);
    const [showEditor, setShowEditor] = useState(false);
    const [showLargeList, setShowLargeList] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    const errorCallback = (item, action) => {
        showToast({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue', life: 3000 });
        console.warn(item, action)
    }

    useEffect(()=>{
        firstArgument(outage.id)
    }, [outage])

    const { items, firstArgument, addDefaultHandler, updateDefaultHandler, deleteDefaultHandler } = useList(relation.list, {
        onError: errorCallback,
        useArg: true
    });

    const panelActionCallback = (action) => {
        switch (action) {
            case 'enlarge':
                onExpand();
                break;
            case 'add':
                onAdd();
                break;
            default:
                break;
        }
    }

    const onExpand = () => {
        setShowLargeList(true);
    }

    const onAdd = () => {
        setEditedItem(getNewItem())
        setShowEditor(true)
    }
    const onUpdate = (item) => {
        setEditedItem(item)
        setShowEditor(true)
    }
    const onDelete = (item) => { 
        deleteDefaultHandler(item)
    }

    const addHandler = (item) => {
        addDefaultHandler({
            outageId: outage.id,
            ...item
        })
    }

    const updateHandler = (item) => { 
        updateDefaultHandler(item)
    }

    const getNewItem = () => {
        if (newitemFactory && typeof newitemFactory === Function) {
            return newitemFactory(outage, items)
        } else {
            return {
                id: null
            }
        }
    }

    return (
        <>
            <div className="related-panel bg-body-tertiary rounded shadow-sm p-2 mt-3">
                <div className="hstack mb-2">
                    <h5 className="me-auto text-capitalize">{relation.item + 's'}</h5>
                    {(outage && outage.id) && <Actions actions={relation.actions.filter(a => a === 'enlarge' || a === 'add')} callback={panelActionCallback} />} 
                </div>
                {(outage === null || outage.id === null) && <NoIncident />}
                {(outage && outage.id && items.length === 0) && noContent}
                {(outage && outage.id && items.length > 0) && <CompactList items={items} onDelete={onDelete} onUpdate={onUpdate} ItemComponent={compactItem} />}
                <ModalList columns={relation.columns} show={showLargeList} showSetter={setShowLargeList} items={items} onEdit={onUpdate} onDelete={onDelete} title={`Liste des ${relation.item}s`} />
                <ModalForm show={showEditor} showSetter={setShowEditor} item={editedItem} Form={Form} onAdd={addHandler} onEdit={updateHandler} title={`${(editedItem && editedItem.id) ? 'Modifier' : 'Ajouter'} un ${relation.item}`} />
            </div>
        </>
    )
}

const NoIncident = () => {
    return (
        <TextPlaceholder text="Enregistrez l'incident pour activer cette liste" />
    )
}

const TextPlaceholder = ({ text = 'no content' }) => {
    return (
        <div className="p-2 text-center text-secondary">{text}</div>
    )
}

const Actions = ({ actions, callback }) => {
    return (
        <ButtonGroup className="actions" size="sm">
            {actions.map(a => {
                return <Button key={a} variant="light" onClick={() => { callback(a) }}>
                    {a === 'enlarge' && <BoxArrowUpRight />}
                    {a === 'add' && <PlusLg />}
                    {(a !== 'enlarge' && a !== 'add') && a}
                </Button>
            })}
        </ButtonGroup>
    )
}

const ModalList = ({ show, showSetter, items, columns, onEdit, onDelete, title }) => {
    return (<>
        <Modal show={show} size="lg" onHide={() => { showSetter(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TableList items={items} onDelete={onDelete} onUpdate={onEdit} columns={columns} />
            </Modal.Body>
        </Modal>
    </>)
}

const OuterForm = ({ InnerForm, item, onAdd, onEdit, showSetter }) => {
    const { register, handleSubmit, control, reset } = useForm();

    useEffect(() => {
        if (item) {
            reset(item)
        }
    }, [item])

    const onSubmit = (data) => {
        if (data && data.id === null) {
            onAdd(data)
        } else if (data && data.id) {
            onEdit(data)
        } else {
            console.warn('onSubmit', data)
        }
        showSetter(false)
    }
    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InnerForm item={item} control={control} register={register} />
            <Button type="submit">Enregistrer</Button>
        </form>
    </>)
}

const ModalForm = ({ show, showSetter, item, onAdd, onEdit, Form, title }) => {
    return (<>
        <Modal show={show} size="lg" onHide={() => { showSetter(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OuterForm InnerForm={Form} item={item} onAdd={onAdd} onEdit={onEdit} showSetter={showSetter} />
            </Modal.Body>
        </Modal>
    </>)
}

export { RelatedPanel, relations, ago, formatDatetime }
