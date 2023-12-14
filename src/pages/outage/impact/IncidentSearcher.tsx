import {useForm} from 'react-hook-form'

type IncidentSearcherProps = {
    onChange: (input: string) => void
}
type Form = {
    input: string
}

function IncidentSearcher(props: IncidentSearcherProps) {
    const {handleSubmit} = useForm<Form>()

    const onSubmit = (data: Form) => {

        if (data.input.length >= 4) {
            if (data.input.substring(0, 4) === "INCT") {
                props.onChange(data.input);
            } 
        }
    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h4 className="pb-2 mb-5">Besoin d'aide à propos d'un incident ?</h4>
            <div className="row mb-2">
                <label htmlFor="colFormLabelLg" className="col-sm-1 col-form-label col-form-label-lg">Référence</label>
                <div className="col-sm-11">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control form-control-lg" id="reference" placeholder="INCT0000000" ></input>
                        <input type='submit'>Rechercher</input>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export {IncidentSearcher}