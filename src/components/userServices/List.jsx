import { useState, useRef, useEffect, useContext, useMemo } from "react";
import Subscription from "./Item";
import { ServiceContext } from "./Panel";


const ServiceList = ({ listName, editable = true, onChanged, setList, deleteCallback }) => {
    const { customList, coreList, availableCatalog, addFromCatalog, setAvailableCatalog } = useContext(ServiceContext);

    const items = useMemo(()=>{
        if (listName==='customList') {
            return customList;
        } else {
            return coreList;
        }
    }, [listName, customList, coreList])

    const addCallback = (label) => {
        const service = availableCatalog.find((s) => s.name === label);
        if (!service) {
            alert('Vérifiez votre saisie!')
            return
        }
        addFromCatalog(service);
        onChanged();
    }

    const moveUp = (index) => {
        const item = items[index];
        const newItems = items.map((e, i) => {
            if (i === index) {
                return items[i - 1]
            } else if (i === index - 1) {
                return item;
            } else {
                return e
            }
        })
        setList(newItems);
    }
    const moveDown = (index) => {
        const item = items[index];
        const newItems = items.map((e, i) => {
            if (i === index) {
                return items[i + 1]
            } else if (i === index + 1) {
                return item;
            } else {
                return e
            }
        })
        setList(newItems);
    }
    const onMove = (id, up) => {
        const getIndex = (id) => {
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                if (e.service.id === id) {
                    return i
                }
            }
            return null
        }

        const index = getIndex(id);
        if ((index === 0 && up) || (index === items.length - 1 && !up)) {
            return
        }
        if (up) {
            moveUp(index);
        } else {
            moveDown(index);
        }
        onChanged();
    }
    const onDelete = (subcription) => {
        console.log(subcription)
        setList(
            items.filter(s => {
                if (s.service.id !== subcription.service.id) {
                    return true
                } else {
                    subcription = s
                    return false
                }
            })
        );
        setAvailableCatalog(
            [
                ...availableCatalog,
                subcription.service
            ]
        );
        if (subcription.id !== null) {
            deleteCallback(subcription);
        }
    };
    const onNotify = (id, notify) => {
        const updated = items.map(item => {
            if (item.service.id === id) {
                const newItem = { ...item }
                newItem.notify = notify
                return newItem
            } else {
                return item
            }

        });
        setList(updated);
        onChanged();
    }
    
    return (
        <>
            <div className="service-list">
                {editable && <ItemAddPanel availables={availableCatalog} callback={addCallback} />}
                <div className="list-group mt-2">
                    {items && <>
                        {items.map(item => (
                            <Subscription subscription={item} key={item.service.id} notify={item.notify} onDelete={onDelete} onMove={onMove} onNotify={onNotify} moveable={editable} />
                        ))}
                    </>}
                </div>
            </div>
        </>
    );
};

const ItemAddPanel = ({ availables, callback, enabled = true }) => {
    const option = useRef();
    const addCallback = () => {

        const serviceLabel = option.current.value;
        if (serviceLabel === '') {
            return
        }
        option.current.value = '';
        callback(serviceLabel);
    }

    const isVisible = useMemo(()=>{
        return (enabled && availables && Array.isArray(availables) && availables.length > 0);
        
    },[availables, enabled]);

    return (
        <>
            {isVisible &&
                <div className="bg-primary-subtle p-2 rounded hstack">
                    <input enabled={enabled.toString()} ref={option} className="form-control" list="list" id="exampleDataList" placeholder="Service à ajouter..."></input>
                    <datalist id="list">
                        {availables.map(e => (<option value={e.name} key={e.id}></option>))}
                    </datalist>
                    <button className="btn btn-primary ms-2" onClick={addCallback}>Ajouter</button>
                </div>
            }
        </>
    )
}

export default ServiceList;