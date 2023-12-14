import { MutableRefObject } from "react";
import useEventListener from "./useEventListener";

export default function useClickOutside(ref: MutableRefObject<any>, cb: (e: any) => void) {
    useEventListener("click", (e: any) => {
        if (ref.current == null || ref.current.contains(e.target)) return
        cb(e)
    }, document)
}