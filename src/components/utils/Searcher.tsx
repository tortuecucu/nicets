import { useState, useRef } from 'react';
import { Controller } from "react-hook-form"
import { useDebounce } from '../../hooks/custom/useDebounce';

interface Option {
    id: number,
    value: string
}

interface SearcherProps {
    id: string,
    label: string,
    labelClass: string,
    inputClass: string,
    placeholder: string,
    fetcher: (term: string) => Promise<any[]>,
    minChar: number,
    onSelect?: (value: any) => void
}

const Searcher = (props: SearcherProps) => {
    const [options, setOptions] = useState<Option[]>([])
    const [search, setSearch] = useState<string>()

    const { fetcher } = props;

    const handleSearch = useDebounce(async () => {
        if (search) {
            const data = await fetcher(search)
                setOptions([...data])
        }
    }, 500)

    const searchCallback = (term: string) => {
        if (term.length >= props.minChar) {
            setSearch(term)
            handleSearch(term)
        }
    }

    const selectCallback = (value: string) => {
        if (props.onSelect) {
            props.onSelect(value)
        }
    }

    return (
        <SearcherDatalist options={options} onSearched={searchCallback} onSelected={selectCallback} {...props} />
    )
}
Searcher.defaultProps = {
    id: 'searcher',
    label: null,
    placeholder: null,
    labelClass: 'form-label',
    inputClass: 'form-control',
    minChar: 3,
    onSelect: undefined
}

interface ControlledSearcherProps {
    name: string,
    control: any,
    fetcher: (term: string) => Promise<any[]>
}

const ControlledSearcher = (props: ControlledSearcherProps) => {
    return (
        <Controller render={({ field: { onChange } }) => {
            return (
                <Searcher onSelect={(o) => {
                    onChange(o)
                }} {...props} />
            )
        }}
            name={props.name}
            control={props.control}
        />
    )
}

interface SearcherDatalistProps {
    id: string,
    label: string,
    labelClass: string,
    inputClass: string,
    placeholder: string,
    options: Array<{
        id: number,
        value: string
    }>,
    onSearched: (value: string) => void,
    onSelected: (value: any) => void
}

const SearcherDatalist = (props: SearcherDatalistProps) => {
    const { id, options, label, labelClass, inputClass, placeholder, onSearched, onSelected } = props
    const input = useRef(null)

    const inputCallback = () => {
        const input = useRef<HTMLInputElement>(null);
        const value = input.current?.value || '';
        const match = options.find(o => o.value === value)

        if (match) {
            onSelected(match)
        } else {
            onSearched(value)
        }
    }

    return (<>
        {label && <label htmlFor={id} className={labelClass}>{label}</label>}
        <input ref={input} className={inputClass} list="list" id={id} placeholder={placeholder} onInput={inputCallback}></input>
        <datalist id="list">
            {options.map(e => (<option value={e.value} key={e.id}></option>))}
        </datalist>
    </>)
}

export { Searcher, ControlledSearcher }