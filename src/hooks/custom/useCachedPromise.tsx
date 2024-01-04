import { useStorage } from "./useStorage"
import { useState } from "react"
import { PromiseProvider } from "src/types/common";
import { UseStorageOptions } from "./useStorage";

/**
 * cache the result of the promise using the Storage API
 * @param {Promise} promise 
 * @param {string} key 
 * @param {object} options 
 * @returns hook
 */
function useCachedPromise<S> (promise: PromiseProvider, key: string, options: UseStorageOptions)  {
    const {get, set} = useStorage<S>(key, options);
    const [wasCalled, setWasCalled] = useState<boolean>(false);

    const wrapper = async () => {
        if (wasCalled) {
            return get()
        } else {
            const res = await promise()
            setWasCalled(true)
            set(res)
            return res
        }
    }

    const invalidate = () => {
        setWasCalled(false)
    }

    return {wrapper, invalidate}
}

export {useCachedPromise}