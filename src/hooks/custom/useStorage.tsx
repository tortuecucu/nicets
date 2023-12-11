import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { StringMap } from "src/types/common"

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

/**
 * stores the given parameter using the Storage API
 * @param {string} key name of the parameter
 * @param {object} options 
 * @returns react hook
 */
const useStorage = (key: string, options: UseStorageOptions) => {
    const params = mergeParams(options, defaultOptions)
    const storage = (options.local) ? localStorage : sessionStorage

    const initValue = () => {

        const fallback = { 
            created: undefined,
            data: params.fallback
        }

        let record: StringMap
        const data = storage.getItem(key)
        if (data) {
            record = JSON.parse(data)
        } else {
            record = fallback
        }

        if (params.expires && !params.local && dayjs(record.created).isBefore(dayjs())) {
            remove()
            return fallback
        } else {
            return record
        }
    }

    const [value, setValue] = useState(initValue)

    useEffect(() => {
        storage.setItem(key, JSON.stringify({
            created: dayjs().toJSON(),
            data: value
        }))
    }, [value, key])

    const remove = () => {
        storage.removeItem(key)
    }

    return [value, setValue, remove]

}

export { useStorage }