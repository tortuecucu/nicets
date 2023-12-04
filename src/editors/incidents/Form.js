import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Wrapper } from "../components/Wrapper"
import { WrappedService } from "../components/Service"
import { Status } from "../components/Status"
import { DateTime } from "../components/DateTime"
import { PrioritySelect } from "../components/PrioritySelect"
import { TypeSelect } from "../components/TypeSelect"
import { MileStones } from "./panels/Milestones"
import { Details } from "./panels/Details"
import { Etas } from "./panels/Etas"
import { Events } from "./panels/Events"
import { Locations } from "./panels/Locations"
import { Services } from "./panels/Services"
import { useEffect } from "react"

const IncidentForm = ({ item, onAdd, onUpdate}) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="mb-4">{item ? 'Modifier un incident' : 'Ajouter un incident'}</h3>
            <div className="row">
                <div className="col col-4">
                    <Services outage={item.outage} />
                    <Locations outage={item.outage} />
                    <Etas outage={item.outage} />
                    <Details outage={item.outage} />
                    <MileStones outage={item.outage} />
                    <Events outage={item.outage} />
                </div>
                <div className="col col-8">
                    <MainForm item={item} onAdd={onAdd} onUpdate={onUpdate} />
                </div>
            </div>
        </div>
    )
}

const MainForm = ({ item, onAdd, onUpdate }) => {
    const { register, handleSubmit, reset, control } = useForm();

    useEffect(() => {
        reset(item)
    }, [item])

    const onSubmit = (data) => {
        if (data.id) {
            onUpdate(data)
        } else {
            onAdd(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-body-tertiary rounded shadow-sm p-3">
                <h4>Informations générales</h4>
                <div className="border-bottom pb-4 my-3">
                    <div className="d-flex flex-row">
                        <WrappedService className='col' id='serviceId' label='Business Service' text='service affecté par cette maintenance' control={control} name='outage.serviceId' />
                        <PrioritySelect id="priority" control={control} name="priority" className="w-25 ms-3" />
                    </div>
                    <div className="d-flex flex-row">
                        <TypeSelect id="type" control={control} name="outage.typeId" className="w-50" />
                        <Wrapper className='ms-3 w-50' id='status' label='Statut'>
                            <Status id='status' control={control} name='outage.statusId' />
                        </Wrapper>
                    </div>
                </div>
                <div className="border-bottom pb-3 my-3">
                    <Wrapper id='title' className='' label="Nom de l'incident" text='Nom qui apparaitra dans les listes de perturbations'>
                        <input id='title' className="form-control" placeholder="titre" {...register("outage.shortDescription", { required: true })} />
                    </Wrapper>
                    <Wrapper id='desc' label='Description' text='La description apparaîtra dans la page dédiée à cette maintenance'>
                        <textarea id='desc' className="form-control" rows={4} placeholder="description" {...register("outage.description", { required: true })} />
                    </Wrapper>
                    <Wrapper id='number' label="Numéro d'incident" text="Référence de l'incident dans serviceNow">
                        <input id='number' className="form-control" placeholder="INCT" {...register("number")} />
                    </Wrapper>
                </div>
                <div className="border-bottom pb-3 my-3 d-flex flex-row gap-3">
                    <Wrapper className='flex-fill' id='startAt' label='Début'>
                        <DateTime id='startAt' className="form-control" control={control} name='outage.startAt' />
                    </Wrapper>
                    <Wrapper className='flex-fill' id='endAt' label='Fin'>
                        <DateTime id='endAt' className="form-control" control={control} name='outage.endAt'  />
                    </Wrapper>
                    <Wrapper className='w-25' id='ttr' label='Time To Resolve (TTR)'>
                        <input id='ttr' className="form-control" placeholder="TTR" {...register("ttr")} />
                    </Wrapper>
                </div>
                <div className="hstack mb-3 mt-5">
                    <Button type="submit" size="lg" className="ms-auto">Enregistrer</Button>
                </div>
            </div>
        </form>
    )
}

export { IncidentForm }