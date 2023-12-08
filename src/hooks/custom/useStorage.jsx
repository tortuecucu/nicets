import { useState, useEffect } from "react"
import dayjs from "dayjs"

const mergeParams = (params, defaultValues) => {
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

/**
 * stores the given parameter using the Storage API
 * @param {string} key name of theparameter
 * @param {object} options 
 * @returns react hook
 */
const useStorage = (key, options) => {
    const params = mergeParams(options, defaultOptions)
    const storage = (options.local) ? localStorage : sessionStorage

    const initValue = () => {
        const fallback = {
            created: undefined,
            data: params.fallback
        }
        const record = JSON.parse(storage.getItem(key)) ?? fallback

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