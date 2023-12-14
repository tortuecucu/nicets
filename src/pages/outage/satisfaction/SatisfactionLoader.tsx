import { useOutage } from "src/hooks/backend/useOutage"
import { OutageType } from "src/types/outage"
import { ballot, npsBallots } from "src/types/satisfaction"
import { useVote } from "src/hooks/backend/useVote"
import { DataManager, useResponseContext } from "src/components/puller/DataPuller"
import { PageLoader } from "src/components/utils/PulseLoader"
import { BigMessage } from "src/components/utils/BigMessages"
import { OutageStatus } from "src/types/outagestatuses"
import { useStorage } from "src/hooks/custom/useStorage"

export type SatisfactionLoaderProps = {
    outageId: number,
    children: React.ReactElement
}

enum RefusalReason {
    noRefusal = 0,
    outageError = 1,
    outageNotAssessable = 2,
    ballotError = 3,
    ballotClosed = 4,
    resultsError = 5
}

export type satisfactionData = {
    outage?: OutageType,
    ballot?: ballot,
    userVoted?: boolean,
    ballotsCast?: npsBallots,
    refusal: RefusalReason
}

const fetcher = (outageId: number): () => Promise<satisfactionData> => {
    return async (): Promise<satisfactionData> => {
        const { getById } = useOutage()
        const { getOutageBallot, getBallot, isBallotOpen, getNpsResults } = useVote()

        const [outage, errOutage] = await getById(outageId)
        if (errOutage || outage === null) {
            return {
                refusal: RefusalReason.outageError
            }
        }

        if (outage?.statusId === OutageStatus.NominalStated) { 
            return {
                refusal: RefusalReason.outageNotAssessable
            }
        }

        const [ballotId, errBallotId] = await getOutageBallot(outage as OutageType)
        if (errBallotId || ballotId === null) {
            return {
                refusal: RefusalReason.ballotError
            }
        }

        const [ballot, ballotErr] = await getBallot(ballotId as number)
        if (ballotErr || ballot === null) {
            return {
                refusal: RefusalReason.ballotError
            }
        }

        if (!isBallotOpen(ballot as ballot)) {
            return {
                refusal: RefusalReason.ballotClosed
            }
        }

        const hasVoted: boolean = wasBallotSubmitted(ballotId as number)

        const [results, resultsErr] = await getNpsResults(ballot.id)
        if (resultsErr || results === null) {
            return {
                refusal: RefusalReason.resultsError
            }
        }

        return {
            outage: outage,
            ballot: ballot,
            userVoted: hasVoted,
            ballotsCast: results,
            refusal: RefusalReason.noRefusal
        }

    }

}

const wasBallotSubmitted = (ballotId: number): boolean => {
    const trackerName = `npsBallot#${ballotId}`
    const {record} = useStorage<number>(trackerName)
    return (record !== undefined)
}

const isSuccess = (data: satisfactionData): boolean => {
    return data.refusal === RefusalReason.noRefusal
}

const SatisfactionLoader = (props: SatisfactionLoaderProps) => {
    return (<>
        <DataManager promise={fetcher(props.outageId)} successFunc={isSuccess} loadingElement={<PageLoader />} fallback={<Refusal />}>
            {props.children}
        </DataManager>
    </>)
}

const Refusal = () => {
    const { data } = useResponseContext<satisfactionData>()

    let imageSrc: string
    let imageWidth: number
    let title: string
    let subtitle: string

    //TODO: compléter les informations

    switch (data.refusal) {
        case RefusalReason.outageError:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Incident non trouvé'
            subtitle = 'Aucun incident n\'est associé à cet identifiant'
            break;

        case RefusalReason.outageNotAssessable:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Incident non évaluable'
            subtitle = 'Cet incident n\'est pas encore ou plus évaluable'
            break;

        case RefusalReason.ballotError:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Suffrage non trouvé'
            subtitle = 'Le scrutin permettant d\'évaluer cet incident n\'a pas pu être trouvé'
            break;

        case RefusalReason.ballotClosed:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Le vote est clos'
            subtitle = 'Il est trop tard pour exprimer votre satisfaction à propose de cet incident'
            break;

        case RefusalReason.resultsError:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Résultats non trouvés'
            subtitle = 'Imlpossible actuellement de collecter les tendances du vote'
            break;

        default:
            imageSrc = '/imgs/closed.svg'
            imageWidth = 430
            title = 'Une erreur est survenue'
            subtitle = 'Impossible d\'afficher la page'
            break;
    }

    return (
        <BigMessage imageSrc={imageSrc} width={imageWidth} title={title} subtitle={subtitle} />
    )
}

export { SatisfactionLoader }