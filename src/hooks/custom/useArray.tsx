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

    function sort (sorter: (a: S, b: S) => number): void {
        const sorted = array.sort(sorter)
        setArray(sorted)
    }

    const find = (finder: (item: S) => Boolean): S | undefined => {
        return array.find(finder)
    }

    const set = (values: S[]) => {
        setArray([
            ...values
        ])
    }

    const isEmpty = () => array.length === 0;

    return {array, set, push, filter, update: updateAt, remove, clear, updateItem, sort, find, isEmpty}
}

export {useArray}