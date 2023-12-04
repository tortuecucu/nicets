import { Controller } from "react-hook-form"
import Select from "react-select";

const Status = ({control, name, id}) => {
    const status = [
        { value: 1, label: "Préalerte" },
        { value: 2, label: "Service perturbé" },
        { value: 4, label: "Service rétabli" }
    ]
    return (
        <Controller render={({ field: { onChange, onBlur, value } }) => {
            return (
                <Select
                    id={id}
                    options={status}
                    onChange={(e) => {
                        onChange(e.value);
                    }}
                    value={status.find(c => c.value === value)}
                />
            );
        }}
            name={name}
            control={control}
            //defaultValue={default_value}
        />
    )
}

export {Status}
