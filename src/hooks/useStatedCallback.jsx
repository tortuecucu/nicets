import { useEffect, useState } from "react"

const PROMISE_STATES = {
    NOT_RUNNING: 0,
    RUNNING: 1,
    ENDED: 2
}

/**
 * add a state to a promise or function that allows to follow execution progress
 * @param {Function} funcOrPromise 
 * @param {number} resetDelay 
 * @returns hook
 */
const useStatedCallback = (funcOrPromise, resetDelay = 2000) => {
    const [state, setState] = useState(0)
    const [autoReset, setAutoReset] = useState(false)

    //handle the scheduled reset of the status
    useEffect(()=>{
        if (autoReset) {
            const waitAndReset = async ()=> {
                await new Promise(resolve => setTimeout(resolve, resetDelay))
                if (state===2) {
                    setState(0)
                    setAutoReset(false)
                }
            }
            waitAndReset()
        }
    }, [autoReset])

    //reset state to the initial state
    const reset = () => {
        setState(0)
    }

    //executes the callback
    const stateWrapper = (executor) => {
        setState(1)
        const result = executor()  
        setState(2)
        if (resetDelay > 0) {
            setAutoReset(true)
        }
        return result
    }

    const run = async (...args) => {
        console.log('run', funcOrPromise)
        setState(1)
        const result = await funcOrPromise(...args)
        setState(2)
        if (resetDelay > 0) {
            setAutoReset(true)
        }
        return result
    }

    const runSync = (...args) => {
        return stateWrapper(
            () => {return funcOrPromise(...args)}
        )
    }

    return { state, run, reset, runSync }
}

export { useStatedCallback, PROMISE_STATES }