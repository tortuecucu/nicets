import { useMemo } from "react"

import { npsBallots } from "src/types/satisfaction"

type BallotsCastProps = {
    userNote: number,
    ballots: npsBallots
}

type npsGroups = {
    votes: number,
    detractors: number,
    promoters: number
}

function BallotsCast(props: BallotsCastProps) {
    const { userNote, ballots } = props;
    const groups: npsGroups = useMemo(() => {
        if (ballots) {
            return {
                votes: ballots.segments.reduce((accu, curr, _index) => {
                    return accu + curr.votes
                }, 0),
                detractors: ballots.segments.reduce((accu, curr) => {
                    return accu + ((curr.note < 7) ? curr.votes : 0)
                }, 0),
                promoters: ballots.segments.reduce((accu, curr) => {
                    return accu + ((curr.note > 8) ? curr.votes : 0)
                }, 0)
            }
        }
        return {
            votes: 0,
            detractors: 0,
            promoters: 0
        }
    }, [ballots])

    return (
        <><ResultPanelDummy userNote={userNote} votes={groups.votes} score={ballots.score} promoters={groups.promoters} detractors={groups.detractors} neutrals={groups.votes - (groups.promoters + groups.detractors)}/></>
    );
}

type ResultPanelDummyProps = {
    userNote: number,
    votes: number,
    score: number,
    promoters: number,
    neutrals: number,
    detractors: number
}

const ResultPanelDummy = (props: ResultPanelDummyProps) => {
    return (
        <>
            <div className="my-3 p-4 bg-body rounded shadow-sm">
                <div className="row">
                    <div className="col">
                        <h2 className="pb-2 mb-2">Merci pour votre participation !</h2>
                        <p className='lead'>Voici notre performance actuelle, évoluant à chaque nouveau vote:</p>
                        <div className='d-flex p-4 gap-4'>
                            <div className='flex-fill bg-light rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-medium text-dark'>{props.votes}</span>
                                <span className='fw-light text-dark'>votants</span>
                            </div>
                            <div className='flex-fill bg-light rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-medium text-dark'>{props.score}</span>
                                <span className='fx-light text-dark'>score NPS</span>
                            </div>
                            <div className='flex-fill bg-danger rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{props.detractors}</span>
                                <span className='text-white fw-light'>détracteurs</span>
                            </div>
                            <div className='flex-fill bg-warning rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{props.neutrals}</span>
                                <span className='text-white fw-light'>neutres</span>
                            </div>
                            <div className='flex-fill bg-success rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{props.promoters}</span>
                                <span className='text-white fw-light'>promoteurs</span>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='mb-3'>
                                <h5>Qu'est ce qu'un score NPS ?</h5>
                                <p>Le Net Promoter Score (NPS) est un standard incontournable de l'évaluation de la satisfaction clients, dans toutes les activités</p>
                            </div>
                            <div className='mb-3'>
                                <h5>A quoi va servir mon vote ?</h5>
                                <p>Le Net Promoter Score (NPS) est un standard incontournable de l'évaluation de la satisfaction clients, dans toutes les activités</p>
                            </div>
                            <div className='mb-3'>
                                <h5>Et votre performance ?</h5>
                                <p>Le Net Promoter Score (NPS) est un standard incontournable de l'évaluation de la satisfaction clients, dans toutes les activités</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export { BallotsCast }