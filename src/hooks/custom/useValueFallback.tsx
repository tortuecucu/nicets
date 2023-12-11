
const useValueFallback = (value: string, fallback: string ): string => {
    try {
        return value
    } catch (e) {
        console.error(e)
        return fallback
    }
}

export {useValueFallback}