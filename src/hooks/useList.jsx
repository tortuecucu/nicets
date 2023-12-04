import { useState, useMemo, useEffect } from "react"
import { useApi } from "../contexts/ApiProvider";
import { ToastContext } from "../pages/Layout";
import { useContext } from "react";

const ACTIONS = {
    ADD: 1,
    UPDATE: 2,
    DELETE: 3,
    GETALL: 4
}

//errorCallback
const useList = (list, options) => {
    const api = useApi();
    const [items, setItems] = useState([]);
    const [arg, setArg] = useState(undefined);
    const { showToast } = useContext(ToastContext);

    const calls = [
        {
            list: 'newslink',
            funcs: {
                addItem: 'addNewslink',
                updateItem: 'updateNewslink',
                deleteItem: 'deleteNewslink',
                getItems: 'getNewslink'
            }
        },
        {
            list: 'maintenance',
            funcs: {
                addItem: 'addMaintenance',
                updateItem: 'updateMaintenance',
                deleteItem: 'deleteMaintenance',
                getItems: 'getMaintenances'
            }
        },
        {
            list: 'incident',
            funcs: {
                addItem: 'addIncident',
                updateItem: 'updateIncident',
                deleteItem: 'deleteIncident',
                getItems: 'getIncidents'
            }
        },
        {
            list: 'detail',
            funcs: {
                addItem: 'addOutageDetail',
                updateItem: 'updateOutageDetail',
                deleteItem: 'deleteOutageDetail',
                getItems: 'getOutageDetails'
            }
        },
        {
            list: 'eta',
            funcs: {
                addItem: 'addOutageEta',
                getItems: 'getOutageEtas'
            }
        },
        {
            list: 'event',
            funcs: {
                addItem: 'addOutageEvent',
                updateItem: 'updateOutageEvent',
                deleteItem: 'deleteOutageEvent',
                getItems: 'getOutageEvents'
            }
        },
        {
            list: 'location',
            funcs: {
                addItem: 'addOutageLocation',
                updateItem: 'updateOutageLocation',
                deleteItem: 'deleteOutageLocation',
                getItems: 'getOutageLocations'
            }
        },
        {
            list: 'milestone',
            funcs: {
                addItem: 'addOutageMilestone',
                updateItem: 'updateOutageMilestone',
                deleteItem: 'deleteOutageMilestone',
                getItems: 'getOutageMilestones'
            }
        },
        {
            list: 'service',
            funcs: {
                addItem: 'addOutageService',
                updateItem: 'updateOutageService',
                deleteItem: 'deleteOutageService',
                getItems: 'getOutageServices'
            }
        }
    ]

    const ready = () => {
        return ((!options) || (!options.useArg) || (options.useArg && arg!==undefined && arg!==null))
    }

    const funcs = useMemo(() => {
        return calls.find(item => item.list === list).funcs
    }, [list])
  
    useEffect(() => {
        if (funcs && ready()) {
            api[funcs.getItems](arg)
                .then(data => {
                    const [resp, err] = data;
                    if (err) {
                        console.error(err)
                    } else {
                        setItems([
                            ...resp
                        ]);
                    }
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }, [funcs, arg])

    const funcName = (action) => {
        switch (action) {
            case ACTIONS.ADD:
                return funcs.addItem
            case ACTIONS.UPDATE:
                return funcs.updateItem
            case ACTIONS.DELETE:
                return funcs.deleteItem
            default:
                return null;
        }
    }

    const fetch = async (item, action) => {
        if (arg) {
            return await api[funcName(action)](arg, item)
        } else {
            return await api[funcName(action)](item)
        }
    }

    const bubbleError = (item, action) => {
        try {
            if (options.onError) {
                options.onError(item, action)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //return item or false
    const addItem = async (item) => {
        const [result, err] = await fetch(item, ACTIONS.ADD);        
        if (err) {
            return [false, err]
        } else {
            setItems([
                ...items,
                result
            ])
            return [true, null];
        }
    }

    //return item or false
    const updateItem = async (item) => {
        if (!item.hasOwnProperty('id')) {
            return [false, null]
        }
        const [result, err] = await fetch(item, ACTIONS.UPDATE);
        if (err) {
            return [false, err]
        } else { 
            setItems([
                ...items.map(i => {
                    if (i.id !== item.id) {
                        return i
                    } else {
                        return item
                    }
                })
            ])
            return [true, null];
        }
    }

    //return boolean
    const deleteItem = async (item) => {
        console.info(item)
        if (!item.hasOwnProperty('id')) {
            return [false, null]
        }
        const [success, err] = await fetch(item, ACTIONS.DELETE)

        if (err) {
            return [success, err]
        } else if (success) {
            setItems([
                ...items.filter((i) => i.id !== item.id)
            ])
            return [true, null]
        } else if (options.onError) {
            bubbleError(item, ACTIONS.DELETE)
            return [false, err]
        }
    }

    const errorMessage = { severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue', life: 3000 }
    const successMessage = { severity: 'success', summary: 'Merci', detail: 'Opération effectuée', life: 3000 }

    const defaultResponse = (successMsg, errorMsg) => {
        return (data) => {
            console.log(data)
            const [success, err] = data;
            if (err || !success) {
                showToast(errorMsg);
                console.error(err)
            } else if (success) { 
                showToast(successMsg);
            } 
        }
    }

    const handler =  (method, item, successMsg, errorMsg, response=defaultResponse) => {
        method(item)
        .then((data) => {
            response(successMsg, errorMsg)(data)
        })
        .catch(err => {
            console.error(err)
            showToast(errorMsg)
        })
    }

    const addDefaultHandler = (item, successMsg=successMessage, errorMsg = errorMessage) => {
        handler(addItem, item, successMessage, errorMessage, defaultResponse)
    }

    const updateDefaultHandler = (item, successMsg=successMessage, errorMsg = errorMessage) => {
        handler(updateItem, item, successMessage, errorMessage, defaultResponse)
    }

    const deleteDefaultHandler = (item, successMsg=successMessage, errorMsg = errorMessage) => {
        handler(deleteItem, item, successMessage, errorMessage, defaultResponse)
    }

    const firstArgument = (arg) => {
       setArg(arg)
    }

    return {items, addItem, updateItem, deleteItem, addDefaultHandler, updateDefaultHandler, deleteDefaultHandler, firstArgument}
}

export { useList }