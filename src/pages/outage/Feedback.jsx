import { useState, useEffect, useContext } from 'react';
import { Timeline } from 'primereact/timeline';
import { OutageSummary } from '../../components/home/outages/OutagePanels'
import { useParams } from 'react-router-dom';
import { useApi } from '../../contexts/ApiProvider';
import { DummyData } from '../../components/utils/Alerts';
import { PageLoader } from '../../components/utils/PulseLoader';
import { useMemo } from 'react';
import ReactStars from "react-rating-stars-component";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { EmojiFrown, EmojiNeutral, EmojiSmile } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form";
import { ToastContext } from "../Layout"
import { BigMessage } from '../../components/utils/BigMessages';

const dayjs = require('dayjs')

import("./feedback.css")

function UserTimeline({ outage }) {
    //NEXT
    const events = [
        { status: 'Déclaration helpdesk', date: '15oct 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Sondage impact', date: '15oct 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Modification impact', date: '15oct 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Confirmation retour au nominal', date: '16oct 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="pb-2 mb-0">Vos actions ont fait la différence, merci !</h6>
                <DummyData />
                <div className="d-flex text-body-secondary pt-3 mb-3">
                    <p>Vous nous avez permis de résoudre cet incident plus rapidement</p>
                </div>
                <Timeline align="right" value={events} opposite={(item) => item.status} content={(item) => <small className="date">{item.date}</small>} />
            </div>
        </>
    );
}

function ResultPanel({ results, note }) {
    const groups = useMemo(() => {
        if (results) {
            return {
                votes: results.votes.reduce((accu, curr, index) => {
                    return Number(accu) + Number(curr.votes)
                }, 0),
                detractors: results.votes.reduce((accu, curr) => {
                    return Number(accu) + Number((curr.note < 7) ? curr.votes : 0)
                }, 0),
                promoters: results.votes.reduce((accu, curr) => {
                    return Number(accu) + Number((curr.note > 8) ? curr.votes : 0)
                }, 0)
            }
        }
        return null
    }, [results])

    console.log(groups)
    return (
        <>  {(results!==null && results!==false) &&
            <div className="my-3 p-4 bg-body rounded shadow-sm">
                <div className="row">
                    <div className="col">
                        <h2 className="pb-2 mb-2">Merci pour votre participation !</h2>
                        <p className='lead'>Voici notre performance actuelle, évoluant à chaque nouveau vote:</p>
                        <div className='d-flex p-4 gap-4'>
                            <div className='flex-fill bg-light rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-medium text-dark'>{groups.votes}</span>
                                <span className='fw-light text-dark'>votants</span>
                            </div>
                            <div className='flex-fill bg-light rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-medium text-dark'>{results.score}</span>
                                <span className='fx-light text-dark'>score NPS</span>
                            </div>
                            <div className='flex-fill bg-danger rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{groups.detractors}</span>
                                <span className='text-white fw-light'>détracteurs</span>
                            </div>
                            <div className='flex-fill bg-warning rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{groups.votes - groups.detractors - groups.promoters}</span>
                                <span className='text-white fw-light'>neutres</span>
                            </div>
                            <div className='flex-fill bg-success rounded shadow p-2 d-flex flex-column text-center'>
                                <span className='display-5 fw-bold text-white'>{groups.promoters}</span>
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
        }
        </>
    );
}

function VotingBooth({ onVoted, outage, results }) {
    const [note, setNote] = useState(null);
    const { register, handleSubmit } = useForm();
    const { showToast } = useContext(ToastContext);

    const onSubmit = (data) => {
        if (isValid(data)) {
            onVoted({
                note: note,
                ...data
            })
        }
    }

    const isValid = (data) => {
        //notes under 5 must be detailled
        if (note < 5) {
            const hasOption = ['service', 'recurrence', 'information', 'leadtime', 'other']
                .some((option) => data[option] === true)
            if (!hasOption) {
                showToast({ severity: 'warn', summary: 'Motivez votre vote!', detail: 'Merci de choisir une raison expliquant votre vote', life: 3000 });
                return false
            }
        }

        //other must be detailled
        if (data.other && data.otherText === '') {
            showToast({ severity: 'warn', summary: 'Quel autre raison ?', detail: 'Merci de préciser votre choix autre', life: 3000 });
            return false
        }

        return true;
    }

    const ratingChanged = (newRating) => {
        setNote(newRating * 2)
    };

    const votes = useMemo(()=>{
        if (results) {
            return results.votes.reduce((accu, curr, index) => {
                return Number(accu) + Number(curr.votes)
            }, 0)
        }
        return 0
    }, [results])
    
    return (
        <>
            <div className="my-3 p-3 bg-primary rounded shadow-sm">
                <p className="text-white my-0"><span className="fw-bolder">{votes} utilisateurs</span> ont déjà exprimé leur satisfaction.</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h2 className="pb-4 mb-0">Notez le traitement de cet incident</h2>
                    <p className='text-secondary m-0'>Votre évaluation est indispensable pour améliorer notre prise en charge des incidents</p>
                    <ReactStars count={5} onChange={ratingChanged} size={48} activeColor="#ffd700" classNames='ms-4' />
                    <FactorsSelect note={note} register={register} outage={outage} />
                    <div className="mb-3 mx-4">
                        <textarea {...register("comment")} className="form-control mx-4 pb-4" id="npsComment" rows="3" placeholder="Un dernier mot ?"></textarea>
                    </div>
                    <div className='hstack my-4'>
                        <VotingButton note={note} className="ms-auto" />
                    </div>
                </div>
            </Form>
        </>
    );
}

const VotingButton = ({ note, className, outage }) => {
    return (
        <>
            {note === 5 && <Button type='submit' size='lg' variant='success' className={className}><EmojiSmile /> Voter</Button>}
            {note === 4 && <Button type='submit' size='lg' variant='warning' className={className}><EmojiNeutral /> Voter</Button>}
            {(note < 4 && note !== null) && <Button type='submit' size='lg' variant='danger' className={className}><EmojiFrown /> Voter</Button>}
            {note === null && <Button className={className} variant="light" size="lg" disabled>Notez...</Button>}
        </>
    )
}

const FactorsSelect = ({ outage, note, register }) => {
    const [otherVisible, setOtherVisible] = useState(true);

    const otherCallback = (e) => {
        setOtherVisible(!e.target.checked)
    }

    return (<>
        {(note !== null && note < 5) &&
            <div className='p-4'>
                <h5 className=''>Qu'est-ce que nous devons améliorer ?</h5>
                <div key={`default-checkbox`} className="my-3">
                    <Form.Check {...register("service")} type='checkbox' id='service' label='La qualité du service ' className='fw-semibold' />
                    <span className='ms-4 text-secondary text-muted'>Les fonctions ou la performance du service ne correspondent pas à mon besoin</span>
                    <Form.Check {...register("recurrence")} type='checkbox' id='recurrence' label='La fiabilité du service' className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>Le service est trop souvent indisponible</span>
                    <Form.Check {...register("information")} type='checkbox' id='information' label="Je n'ai pas été assez informé(e)" className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>Je n'ai pas été correctement informé pendant l'arrêt du service</span>
                    <Form.Check {...register("leadtime")} type='checkbox' id='leadtime' label="Durée d'interruption trop longue" className='fw-semibold mt-2' />
                    <span className='ms-4 text-secondary text-muted'>description </span>
                    <Form.Check {...register("other")} type='checkbox' id='other' label='Autre' onChange={otherCallback} className='fw-semibold mt-2' />
                    <Form.Control {...register("otherText")} hidden={otherVisible} id="otherText" size='sm' className='ms-4' placeholder="précisez" maxLength={200} />
                </div>
            </div>
        }
    </>
    );
}

const FeedbackInner = ({ outage, vote, onVoted, results, ballot }) => {

    return (
        <>
            <div className="row mt-4 ms-4">
                <div className="col col-4">
                    <OutageSummary outage={outage} fullHeight={false} />
                    <UserTimeline outage={outage} />
                </div>
                <div className="col col-8">
                    {/* {vote === null && <VotingBooth onVoted={onVoted} outage={outage} results={results} />}
                    {vote !== null && <ResultPanel results={results} vote={vote} />} */}
                    <VotingBooth onVoted={onVoted} outage={outage} results={results} />
                </div>
            </div>
        </>
    );
};

const Feedback = () => {
    const api = useApi();
    const { showToast } = useContext(ToastContext);
    const { id, value } = useParams();
    const [outage, setOutage] = useState(null);
    const [ballot, setBallot] = useState(null);
    const [note, setNote] = useState(null);
    const [results, setResults] = useState(null);

    const loaded = useMemo(() => {
        if (ballot === false || outage === false) {
            return false
        } else if (typeof ballot === 'object' && typeof outage === 'object') {
            return true
        }
        return null
    }, [outage, ballot])


    const onVoted = (data) => {
        const postVote = async () => {
            const [response, err] = await api.postNpsVote(ballot.id, {
                note: data.note,
                comment: data.comment,
                payload: {
                    service: data.service,
                    recurrence: data.recurrence,
                    information: data.information,
                    leadtime: data.leadtime,
                    other: data.otherText
                }
            });
            if (err) {
                console.error(err);
                showToast({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'enregistrer votre réponse', life: 3000 });
            } else if (response != null) {
                showToast({ severity: 'success', summary: 'Merci', detail: 'Votre bonne action compte !', life: 3000 });
                setNote(data.note)
            } else {
                showToast({ severity: 'error', summary: 'Oops', detail: 'Impossible d\'enregistrer votre réponse', life: 3000 });
            }
        }
        postVote();
    }

    //get outage data
    useEffect(() => {
        (async () => {
            const [response, err] = await api.getOutageByID(id);
            if (err) {
                console.error(err);
            } else if (typeof response === 'object') {
                setOutage(response);
            } else {
                setOutage(false)
            }
        })();
    }, [id]);

    //get ballot data
    useEffect(() => {
        const fetchBallot = async () => {
            if (outage && outage.incident && outage.incident.ballotId) {
                const [resp, err] = await api.getBallot(outage.incident.ballotId);
                if (err) {
                    console.error(err)
                } else {
                    setBallot(resp)
                }
            } else if (outage) {
                setBallot(false)
            }
        }
        fetchBallot()
    }, [outage])

    //get current results
    useEffect(() => {
        const fetchResults = async () => {
            if (ballot !== null && ballot !== false) {
                const [resp, err] = await api.getNpsResults(ballot.id)
                if (err) {
                    console.error(err)
                } else {
                    console.info('results', resp)
                    setResults(resp)
                }
            }
        }
        fetchResults();
    }, [ballot, note])

    //ensure ballot is open
    const isOpen = useMemo(() => {
        return true
        // console.log(ballot,)
        // if (ballot !== null && ballot !== false) {
        //     if (ballot.endsAt && dayjs(ballot.endsAt).isAfter(dayjs())) {
        //         return true;
        //     } else if (ballot.endsAt === null) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }
        // return false
    }, [ballot])

    return (<>
        {loaded === null && <PageLoader />}
        {(loaded === true && isOpen) && <FeedbackInner outage={outage} voted={note} onVoted={onVoted} results={results} ballot={ballot} />}
        {(loaded === false || !isOpen) && <NoBallot ballot={ballot} />}
    </>)
}

const NoBallot = ({ ballot }) => {
    return (
        <BigMessage imageSrc='/imgs/closed.svg' width={430} title='Désolé, vous ne pouvez pas voter' subtitle={(ballot !== null) ? 'le vote est clos' : 'la panne est toujours en cours'} />
    )
}

export default Feedback;