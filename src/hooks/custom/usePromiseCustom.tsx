import usePromise from "react-use-promise";

function usePromiseCustom<T>  (promise: Promise<T> | undefined, deps: any[] = [])  {
    const [result, error, state] = usePromise<T>(promise, deps)

    let isLoading: boolean = false
    if (state === 'pending') {
        isLoading = true
    }

    return {result, error, state,  isLoading}
}

export default usePromiseCustom