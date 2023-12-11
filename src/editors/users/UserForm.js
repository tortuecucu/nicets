import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { WrappedInput } from "../components/Wrapper";
import { LocationSelect } from "../components/LocationSelect";
import { CompanySelect } from "../components/CompanySelect";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { StatedSubmitButton } from "../../components/form/StatedSubmitButton.tsx";
import { useStatedCallback } from "../../hooks/custom/useStatedCallback";
import { RolesEditor } from "./RolesEditor";

const UserForm = (props) => {
    const { register, handleSubmit, reset, control, resetField } = useForm();
    const { user, submitButtonLabel } = props;

    const handleFormSubmit = async (data) => {
        return await props.onSubmit(data)
    }

    const { state, run } = useStatedCallback(handleFormSubmit)

    //populate form with user data
    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user])

    //ensure firstname and lastname are consistent with email
    const emailChanged = (e) => {
        const value = (e.target.value) ? String(e.target.value).trim().toLowerCase() : undefined

        const changeField = (field, pattern) => {
            try {
                resetField
                    (field,
                        {
                            defaultValue: value.match(pattern)[1]
                        }
                    )
            } catch (e) {
                console.error(e)
            }
        }

        if (value && value.match(/^[a-z-]+.[a-z-]+\d?@safrangroup.com$/) && (!user.email || value !== user.email)) {
            changeField('firstname', /^([a-z-]+)/)
            changeField('lastname', /\.([a-z-]+)\d?@/)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(async (data) => await run(data))}>
                <WrappedInput id="email" label="Email" text="adresse @safrangroup.com" inputProps={{
                    ...register("email", {
                        required: true,
                        type: 'email',
                        onChange: emailChanged
                    })
                }} />
                <div className="d-flex gap-3">
                    <div className="flex-fill">
                        <WrappedInput id="firstname" label="Prénom" inputProps={{
                            ...register("firstname", {
                                required: true
                            })
                        }} />
                    </div>
                    <div className="flex-fill">
                        <WrappedInput id="lastname" label="Nom" inputProps={{
                            ...register("lastname", {
                                required: true
                            })
                        }} />
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="flex-fill">
                        <CompanySelect control={control} name="companyId" />
                    </div>
                    <div className="flex-fill">
                        <LocationSelect control={control} name="locationId" />
                    </div>
                </div>
                <RolesEditor control={control} name="roles" />
                <div className="hstack">
                    <StatedSubmitButton state={state} buttonProps={{
                        className: "ms-auto",
                        size: "lg"
                        }} size="lg">{submitButtonLabel}</StatedSubmitButton>
                    {props.onReset && <Button variant="secondary" className="ms-2" size="lg" onClick={props.onReset}>Changer d'utilisateur</Button>}
                </div>
            </form>
        </>
    )
}
UserForm.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    submitButtonLabel: PropTypes.string,
    onReset: PropTypes.func,
}
UserForm.defaultProps = {
    user: undefined,
    onSubmit: undefined,
    submitButtonLabel: 'Enregistrer',
    onReset: undefined,
}

export { UserForm }