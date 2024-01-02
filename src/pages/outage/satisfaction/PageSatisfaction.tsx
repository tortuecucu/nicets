import { useParams } from 'react-router-dom';
import { UserTimeline } from './UserTimeline';
import { VotingBooth } from './VotingBooth';
import { OutageSummary } from 'src/components/outage/OutageSummary';
import { SatisfactionLoader, satisfactionData } from './SatisfactionLoader';
import { useResponseContext } from 'src/components/puller/DataPuller';
import { OutageType } from 'src/types/outage';
import { npsBallots, npsForm } from 'src/types/satisfaction';
import { BallotsCast } from './BallotsCast';
import { useState } from 'react';
import { Render } from 'src/components/utils/Render';
import { useVote } from 'src/hooks/backend/useVote';
import usePromise from 'react-use-promise';
import { useToastContext } from 'src/contexts/ToastContext';
import { useStorage } from 'src/hooks/custom/useStorage';

import("./satisfaction.css")

/**
 * this page assists users in expressing their satisfaction using NPS  * about incident handling
 * process flow is described in /docs/ui/satisfaction.drawio
 */


const SatisfactionContent = () => {
    const { data } = useResponseContext<satisfactionData>()
    const {outage, ballotsCast} = data
    const [userNote, setUserNote] = useState<number>()

    let votes = 0
    if (ballotsCast) {
        votes = ballotsCast.segments.map(b => b.votes).reduce((sum, current) => sum + current, 0)
    }

    const handleVote = (form: npsForm):void => {
        const {npsVote} = useVote()
        const {retryLater, warningToast, successToast } = useToastContext()

        const vote = async (): Promise<boolean> => {
            const [success, err] = await npsVote(data.ballot?.id || 0, form)
            if (err || success===null) {
                retryLater()
                return false
            }

            if (success) {
                setUserNote(form.note)
                const {set} = useStorage<Number>(`npsBallot#${data.ballot?.id}`)
                set(form.note)
                successToast('Merci !', 'votre satisfaction est enregistrée')
            } else {
                warningToast('Oups', 'Votre vote n\èa pas pu être comptabilisé !')
            }

            return success
        }

        usePromise(vote)
    }

    return (
        <div className="row mt-4 ms-4">
            <div className="col col-4">
                <OutageSummary outage={outage} fullHeight={false} />
                <UserTimeline outage={outage as OutageType} />
            </div>
            <div className="col col-8">
                <Render condition={(!data.userVoted)} fallback={<BallotsCast userNote={userNote as number} ballots={ballotsCast as npsBallots}/>}>
                    <VotingBooth onVoted={handleVote}  votes={votes} />
                </Render>       
            </div>
        </div>
    )
}

/**
 * loads required data using SatisfactionLoader
 * then displays the required panel with SatisfactionContent
 */
const PageSatisfaction = () => {
    const { id: dirtyId } = useParams();
    let id = 0
    if (dirtyId) {
        id = +dirtyId
    }

    return (<>
        <SatisfactionLoader outageId={id}>
            <SatisfactionContent />
        </SatisfactionLoader>
    </>)
}

export default PageSatisfaction;