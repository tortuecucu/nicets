import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { EmojiFrown, EmojiNeutral, EmojiSmile } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form";
import { FactorsSelect } from './FactorsSelect';
import { RenderOne, Render } from 'src/components/utils/Render';
import { useToastContext } from 'src/contexts/ToastContext';
import { npsForm } from 'src/types/satisfaction';

type VotingBoothProps = {
    onVoted: (data: npsForm) => void,
    votes: number
}

function VotingBooth(props: VotingBoothProps) {
    const { onVoted, votes } = props
    const [note, setNote] = useState<number>(-1);
    const { register, handleSubmit, control } = useForm<npsForm>();
    const { warningToast } = useToastContext()

    const onSubmit = (data: npsForm) => {
        if (isValid(data)) {
            onVoted(data)
        }
    }

    const isValid = (data: npsForm) => {
        //notes under 5 must be detailled
        if (note < 5) {
            if ([data.service, data.recurrence, data.information, data.leadtime, data.other].find((reason) => reason === true)) {
                return true
            }
            warningToast('Motivez votre vote!', 'Merci de choisir une raison expliquant votre vote')
            return false
        }

        //other must be detailled
        if (data.other && data.comment === '') {
            warningToast('Quel autre raison ?', 'Merci de préciser votre choix autr')
            return false
        }

        return true;
    }

    return ( //TODO: use form hook to store the note
        <>
            <div className="my-3 p-3 bg-primary rounded shadow-sm">
                <p className="text-white my-0"><span className="fw-bolder">{votes} utilisateurs</span> ont déjà exprimé leur satisfaction.</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h2 className="pb-4 mb-0">Notez le traitement de cet incident</h2>
                    <p className='text-secondary m-0'>Votre évaluation est indispensable pour améliorer notre prise en charge des incidents</p>

                    <NpsUiFiveStars note={note} setNote={setNote} />

                    <Render condition={(note < 9)}>
                        <FactorsSelect registerHook={register} />
                    </Render>

                    <div className="mb-3 mx-4">
                        <textarea {...register("comment")} className="form-control mx-4 pb-4" id="npsComment" rows={3} placeholder="Un dernier mot ?"></textarea>
                    </div>
                    <div className='hstack my-4'>
                        <VotingButton note={note} className="ms-auto" />
                    </div>
                </div>
            </Form>
        </>
    );
}

type NpsUIProps = {
    note: number,
    setNote: (value: number) => void
}

const NpsUiFiveStars = (props: NpsUIProps) => {
    const STARS: number = 5

    const handleChange = (newRating: number) => {
        props.setNote(newRating * (10 / STARS))
    }

    return (
        <ReactStars count={STARS} onChange={handleChange} size={48} activeColor="#ffd700" classNames='ms-4' />
    )
}

type VotingButtonProps = {
    note: number,
    className: string,
}

const VotingButton = (props: VotingButtonProps) => {
    const { note, className } = props
    return (
        <RenderOne fallback={<Button className={className} variant="light" size="lg" disabled>Notez...</Button>}>
            <RenderOne.Render condition={(note === 4)}>
                <Button type='submit' size='lg' variant='success' className={className}><EmojiSmile /> Voter</Button>
            </RenderOne.Render>
            <RenderOne.Render condition={(note === 5)}>
                <Button type='submit' size='lg' variant='warning' className={className}><EmojiNeutral /> Voter</Button>
            </RenderOne.Render>
            <RenderOne.Render condition={(note < 4)}>
                <Button type='submit' size='lg' variant='danger' className={className}><EmojiFrown /> Voter</Button>
            </RenderOne.Render>
        </RenderOne>
    )
}

export { VotingBooth }