import { useApi } from "src/contexts/ApiProvider"
import { useArray } from "../custom/useArray"
import { AxiosRequestConfig } from "axios"
import { BackendResponse } from "src/types/api"
import { useMount } from "../custom/useMount"
import { useState } from "react"

export interface OutageChild {
    id: number,
    outageId: number
}

type Endpoint = {
    url: string,
    config?: AxiosRequestConfig<any>
}

export type Endpoints = {
    get: Endpoint,
    add: Endpoint,
    update?: Endpoint,
    delete?: Endpoint
}


function useOutageChildren<T extends OutageChild> (outageId: number, endpoints: Endpoints) {
    const api = useApi()
    const {array: children, set: setChildren, remove, updateItem, push } = useArray<T>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    /**
     * Complete the endpoint URL by replacing id variables
     * 
     * @param url - The base URL for the API.
     * @param child - Optional parameter representing the outage child.
     * @returns The complete endpoint URL.
     */
    const getEndpoint = (url: string, child: OutageChild | undefined = undefined): string => {
        url = url.replace('${outageId}', outageId.toString())
        if (child && child !== undefined) {
            url = url.replace('${childId}', child.id.toString())
        }
        return url
    }

    /**
     * Fetches outage children from the backend.
     * @returns {Promise<void>} A promise that resolves when the children are fetched.
     */
    const fetchChildren = async (): Promise<void> => {
        const [rows, err] = await api.getHandler<Array<T>>(getEndpoint(endpoints.get.url), endpoints.get.config)
        if (err) {
            console.error(err);
            return
        } else if (rows && rows.length > 1) {
            setChildren(rows)
        }
    }

    useMount(() => {
        setIsLoading(true)
        fetchChildren()
        setIsLoading(false)
    })

    /**
     * Adds an outage child.
     * 
     * @param child - The child to be added.
     * @returns A BackendResponse containing the added child.
     */
    const addOutageChild = async (child: T): BackendResponse<T> => {
        const [record, err] = await api.postHandler<T>(getEndpoint(endpoints.add.url), child, endpoints.add.config)
        if (err) {
           return [null, err]
        }
        push(record)
        return [record, null]
    };

    /**
     * Updates an outage child.
     * @param child - The child to be updated.
     * @returns A promise that resolves to the updated child.
     */
    const updateOutageChild = async (child: T): BackendResponse<T> => {
        if (endpoints.update === undefined) {
            throw new Error('Update endpoint not defined')
        }
        const [record, err] = await api.putHandler<T>(getEndpoint(endpoints.update.url, child), child, endpoints.update.config)
        if (err) {
           return [null, err]
        }
        updateItem(record, (i: T) => i.id === child.id)
        return [record, null]
    };

    /**
     * Deletes an outage child.
     * @param child - The child to be deleted.
     * @returns A promise that resolves to a BackendResponse<boolean>.
     */
    const deleteOutageChild = async (child: T): BackendResponse<boolean> => {
        if (endpoints.delete === undefined) {
            throw new Error('Delete endpoint not defined')
            
        }
        const [success, err] = await api.deleteHandler(getEndpoint(endpoints.delete.url, child), endpoints.delete.config)
        if (err) {
            return [null, err]
        }
        if (success) {
           remove(children.findIndex((i: T) => i.id === child.id)) 
        }        
        return [success, null]
    };

    return {
        children,
        addOutageChild,
        updateOutageChild,
        deleteOutageChild,
        isLoading
    };
};

export default useOutageChildren;