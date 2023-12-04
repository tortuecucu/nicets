import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Controller } from "react-hook-form"
import { useDebounce } from '../../hooks/useDebounce';

const Searcher = (props) => {
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState(undefined)

    const { fetcher } = props;

    const handleSearch = useDebounce(async (term) => {
        if (search) {
            const data = await fetcher(search)
                setOptions([...data])
        }
    }, 500)

    const searchCallback = (term) => {
        if (term.length >= props.minChar) {
            setSearch(term)
            handleSearch(term)
        }
    }

    const selectCallback = (value) => {
        if (props.onSelect) {
            props.onSelect(value)
        }
    }

    return (
        <SearcherDatalist options={options} onSearched={searchCallback} onSelected={selectCallback} {...props} />
    )
}
Searcher.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    placeholder: PropTypes.string,
    fetcher: PropTypes.func,
    minChar: PropTypes.number,
    onSelect: PropTypes.func
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

const ControlledSearcher = (props) => {
    return (
        <Controller render={({ field: { onChange, value } }) => {
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

const SearcherDatalist = ({ id, options, label, labelClass, inputClass, placeholder, onSearched, onSelected }) => {
    const input = useRef(null)

    const inputCallback = () => {
        const value = input.current.value
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