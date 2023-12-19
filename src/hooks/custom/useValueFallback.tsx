
const useValueFallback = (value: string | undefined, fallback: string ): string => {
    try {
        return (value !== undefined) ? value : fallback
    } catch (e) {
        console.error(e)
        return fallback
    }
}

export {useValueFallback}