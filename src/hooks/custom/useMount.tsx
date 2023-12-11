import { useEffect } from "react";

const useMount = (callback: () => void): void => {
    useEffect(callback, [])
}

export { useMount }