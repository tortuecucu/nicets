
import { useId, useRef, useContext, useState} from "react";
import { useApi } from "../../contexts/ApiProvider";
import { Controller } from "react-hook-form";
import { TitledContent } from "../../components/utils/TitledContent";
import { DataManager, ResponseContext, useResponseContext } from "../../components/puller/DataPuller";

const RolesController = ({ control, name, userId }) => {
    const {data} = useResponseContext()
    const [roles, setRoles] = useState([...data])
    return(
        <Controller defaultValue={roles} render={({ field: { onChange } }) => {

            const changeCallback = (change) => {
                const newRoles = roles.map(r => {
                    return {
                        ...r,
                        granted: (r.id === change.id) ? change.value : r.granted
                    }
                })

                setRoles([
                    ...newRoles
                ])

                onChange(newRoles)
            }

            return (
                <>
                    <TitledContent title="Rôles de l'utilisateur" level={5} titleClass="mt-3">
                        {roles.map(r => <Checkbox itemId={r.id} onChange={changeCallback} key={r.id} label={r.name} checked={r.granted} />)}
                    </TitledContent>
                </>
            )
        }}
            name={name}
            control={control}
        />
    )
}

const RolesEditor = ({ control, name, userId }) => {
    const api = useApi()

    const fetchRoles = async () => {
        const data = await api.getUSerRoles(userId)
        await new Promise(resolve => setTimeout(resolve, 2000))
        return data
    }

    return (
        <DataManager promise={fetchRoles} toast={null}>
            <RolesController control={control} name={name} userId={userId} />
        </DataManager>
    )
}

const Checkbox = (props) => {
    const id = useId()
    const input = useRef()

    const changeCallback = () => {
        props.onChange({
            id: props.itemId,
            value: input.current.checked
        })
    }

    return (
        <div className={props.divClass}>
            <input ref={input} onChange={changeCallback} className={props.inputClass} type="checkbox" defaultChecked={props.checked} id={id}></input>
            {props.label && <label className={props.labelClass} htmlFor={id}>{props.label}</label>}
        </div>
    )
}
Checkbox.defaultProps = {
    divClass: 'form-check',
    inputClass: 'form-check-input',
    labelClass: 'form-check-label',
    label: undefined,
    checked: false
}

export {RolesEditor}