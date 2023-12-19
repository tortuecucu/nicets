import { useState, useEffect } from "react"
import { StringMap } from "src/types/common"
import useDate from "../backend/useDate"

const mergeParams = (params: StringMap, defaultValues: StringMap) => {
    if (typeof params === 'object') {
        return {
            ...defaultValues,
            ...params
        }
    } else {
        return defaultValues
    }
}

const defaultOptions = {
    local: false, //if true, expiration is not applied
    fallback: undefined, //data to return if key is not found or record is expired
    expires: undefined //if expires date is past then delete record
}

export type UseStorageOptions = {
    local: boolean,
    fallback: any,
    expires: any
}

type Record<S> = {
    created?: string,
    data: S
}

/**
 * stores the given parameter using the Storage API
 * @param {string} key name of the parameter
 * @param {object} options 
 * @returns react hook
 */
function useStorage<S>(key: string, options?: UseStorageOptions) {
    const params = mergeParams(options || {}, defaultOptions)
    const useLocal: boolean = (options && options?.local) || false
    const storage = (useLocal) ? localStorage : sessionStorage
    const {isPast, sequelize, now} = useDate()

    const initRecord = (): Record<S> => {

        const fallback = {
            created: undefined,
            data: params.fallback
        }

        let record: Record<S>
        const data = storage.getItem(key)
        if (data) {
            record = JSON.parse(data)
        } else {
            record = fallback
        }

        if (params.expires && !params.local && isPast(record.created)) {
            remove()
            return fallback
        } else {
            return record
        }
    }

    const [record, setRecord] = useState<Record<S>>(initRecord)

    useEffect(() => {
        storage.setItem(key, JSON.stringify(record))
    }, [record, key])

    const remove = () => {
        storage.removeItem(key)
    }

    const set = (value: S): void => {
        setRecord({
            created: sequelize(now),
            data: value
        })
    }

    const get = ():S | undefined => {
        if (record) {
            return record.data
        }
        return undefined
    }

    return { record, get,  set, remove }

}

export { useStorage }