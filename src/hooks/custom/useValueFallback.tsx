
const useValueFallback = (value: any, fallback: string ): string => {
    try {
        return String(value)
    } catch (e) {
        console.error(e)
        return fallback
    }
}

export {useValueFallback}