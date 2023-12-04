/**
 * onAdd() simple callcback
 * onDelete (item) bool
 * onUpdate(item) bool
 */

import objectPath from "object-path";
import { useMemo, useState } from "react"
import { Pencil, X } from "react-bootstrap-icons";
import classNames from 'classnames'
import "./listedit.css"
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ListEdit = ({ items, ItemComponent = ListItem, EmptyComponent = EmptyList, onDelete, onUpdate }) => {
    return (<>
        {Array.isArray(items) && items.length > 0
            ? items.map(i => <ItemComponent key={i.id} item={i} onDelete={onDelete} onUpdate={onUpdate} />)
            : <EmptyComponent />
        }
    </>)
}

const ActionGroup = ({ item, onDelete, onUpdate, compact = false }) => {
    const deleteCallback = () => {
        onDelete(item)
    }
    const updateCallback = () => {
        onUpdate(item)
    }
    return (
        <div className="btn-group btn-group-sm" role="group">
            {onUpdate && <button onClick={updateCallback} type="button" className="btn btn-light"><Pencil /></button>}
            {onDelete && <DeleteAction deleteCallback={deleteCallback} />}
        </div>
    )
}

const DeleteAction = ({ deleteCallback }) => {
    const [show, setShow] = useState(false)
    const hide = () => {
        setShow(false)
    }
    const toggle = (newShow) => {
        setShow(newShow)
    }
    const onDelete = () => {
        hide()
        deleteCallback()
    }
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Supprimer?</Popover.Header>
            <Popover.Body>
                <ButtonGroup >
                    <Button size="sm" variant="danger" onClick={onDelete}>Oui</Button>
                    <Button size="sm" variant="success" onClick={hide}>Non</Button>
                </ButtonGroup>
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger onToggle={toggle} show={show} trigger="click" placement="right" overlay={popover}>
            <Button variant="light"><X /></Button>
        </OverlayTrigger>
    )
}

const ListItem = ({ item, onDelete, onUpdate }) => {
    const label = useMemo(() => {
        return (item.label !== undefined) ? item.label : item.name;
    }, [item]);
    return (<>
        <div className="hstack">
            <span>{label}</span>
        </div>
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
    </>)
}

const EmptyList = () => {
    return (<>
        <span>No items on list</span>
    </>)
}

const ItemSpan = ({ item, className }) => {
    const prop = ['label', 'name', 'title'].find(e => item[e] !== undefined)
    return (<span className={`label ${className}`}>{prop ? item[prop] : 'item'}</span>)
}


const CompactItem = ({ item, onDelete, onUpdate, Renderer = ItemSpan, itemClasses = [] }) => {
    return (<li className={classNames(
        "list-group-item",
        itemClasses
    )}>
        <div className="hstack">
            <Renderer item={item} />
            <ActionGroup item={item} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
    </li>)
}



const CompactList = ({ items, ItemComponent = CompactItem, EmptyComponent = EmptyList, onAdd, onDelete, onUpdate }) => {
    const hasItems = (Array.isArray(items) && items.length > 0);
    const inner = <ListEdit items={items} ItemComponent={ItemComponent} EmptyComponent={EmptyComponent} onAdd={onAdd} onDelete={onDelete} onUpdate={onUpdate} />;
    return (<>
        {hasItems
            ? <ul className="list-group list-edit compact">{inner}</ul>
            : inner
        }
    </>)
}

const TableItem = ({ item, columns, onDelete, onUpdate }) => {
    return <tr>
        {columns.map(c => {
            const display = (c.formatter) ? c.formatter(objectPath.get(item, c.property)) : objectPath.get(item, c.property)
            return <td className="text-wrap" key={c.property}>{display ? display : '---'}</td>
        })}
        <td><ActionGroup item={item} onDelete={onDelete} onUpdate={onUpdate} /></td>
    </tr>
}

const TableList = ({ items, ItemComponent = TableItem, EmptyComponent = EmptyList, onAdd, onDelete, onUpdate, columns }) => {
    const headers = [
        ...columns.map(c => <th key={c.property} scope="col">{c.label}</th>),
        <th key={'actions'} scope="col">Actions</th>
    ]

    const rows = items.map(i => <TableItem key={i.id} item={i} columns={columns} onDelete={onDelete} onUpdate={onUpdate} />)

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {rows
                        ? rows
                        : <EmptyComponent />
                    }

                </tbody>
            </table>
        </>
    )
}

const itemFactory = (itemClasses, Renderer) => {
    return ({ item, onUpdate, onDelete }) => {
        return (
            <CompactItem itemClasses={itemClasses} Renderer={Renderer} item={item} onDelete={onDelete} onUpdate={onUpdate} />
        )
    }
}

export { ListEdit, ListItem, CompactList, CompactItem, TableList, TableItem, ItemSpan, ActionGroup, itemFactory }