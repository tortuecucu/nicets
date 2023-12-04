import { useEffect } from "react";

const useMount = (callback) => {
    useEffect(callback, [])
}

export { useMount }