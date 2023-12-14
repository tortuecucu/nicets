const useStringSanitizer = () => {
    const sanitize = (input: string, acceptedInput: string[], defaultValue: string): string => {
        try {
            const match = acceptedInput.find( v => v === input)
            if (match) {
                return match
            }
            return defaultValue
        } catch (e) {
            console.error(e)
            return defaultValue
        }
    }

    return {sanitize}
}

export {useStringSanitizer}