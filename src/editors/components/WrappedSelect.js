import { Wrapper } from "./Wrapper"
import { Controller } from "react-hook-form"
import Select from "react-select";

const WrappedSelect = ({ control, name, id, label, text, layout, className, values }) => {
    return (
        <Wrapper id={id} label={label} layout={layout} className={className} text={text}>
            <Controller render={({ field: { onChange, value } }) => {
                return (
                    <Select
                        id={id}
                        options={values}
                        onChange={(e) => {
                            onChange(e.value);
                        }}
                        value={values ? values.find(c => c.value === value) : undefined}
                    />
                );
            }}
                name={name}
                control={control}
            />
        </Wrapper>
    )
}

export { WrappedSelect }