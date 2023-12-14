import { useState } from "react";

function useArray<S>(defaultValue: S[] | undefined) {
    const [array, setArray] = useState<S[]>(defaultValue as S[])

    function push(element: S):void {
        setArray(a => [...a, element])
    }

    function filter(callback: (value: S) => boolean): void {
        setArray(a => a.filter(callback))
    }

    function updateAt(index: number, newElement: S): void {
        setArray(a => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length),
        ])
    }

    function remove(index: number): void {
        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)])
    }

    function clear(): void {
        setArray([])
    }

    function updateItem(item: S, matcher: (i: S) => boolean): void {
        setArray(a => [...a.map((v: S) => {
            if (matcher(v)) {
                return item
            } else {
                return v
            }
        })])
    }

    return {array, set: setArray, push, filter, update: updateAt, remove, clear, updateItem}
}

export {useArray}