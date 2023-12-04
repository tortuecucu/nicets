import { useStorage } from "./useStorage"
import { useState } from "react"

/**
 * cache the result f the promise using the Storage API
 * @param {Promise} promise 
 * @param {string} key 
 * @param {object} options 
 * @returns hook
 */
const useStoredPromise = (promise, key, options) => {
    const [result, setResult] = useStorage(key, options);
    const [wasCalled, setWasCalled] = useState(false);

    const wrapper = async () => {
        if (wasCalled) {
            return result
        } else {
            const res = await promise()
            setWasCalled(true)
            setResult(res)
            return res
        }
    }

    const invalidate = () => {
        setWasCalled(false)
    }

    return {wrapper, invalidate}
}

export {useStoredPromise}