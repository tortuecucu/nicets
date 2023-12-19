import { ballot, npsBallots, npsForm, npsPayload } from "src/types/satisfaction"
import { useApi } from "src/contexts/ApiProvider"
import { BackendResponse } from "src/types/api"
import { ToBeDefined } from "src/types/common"
import useDate from "./useDate"
import { OutageFields } from "src/types/outage"
import { OutageStatusId } from "src/types/outagestatus"


const useVote = () => {
    const api = useApi()

    /**
     * add a new nps vote
     * @param ballotId id of the ballot
     * @param note satisfaction 0 to 10
     * @param comment free text
     * @param payload additionnal information that explain the note
     */
    const npsVote = async (ballotId: number, vote: npsForm): BackendResponse<boolean> => {
        const [_, err] = await api.postHandler<npsForm>(`/api/vote/nps/${ballotId}`, vote, undefined)
        if (err) {
            return [null, err]
        }
        return [true, null]
    }

    /**
     * return the id of the ballot that is linked to the given incident
     * @param outageId id of the ballot
     * @returns ballot object
     */
    const getOutageBallot = async (outage: OutageFields): BackendResponse<number | undefined> => {
        if (outage.ballotId) {
            return [outage.ballotId, null]
        }
        const [ballotId, err] = await createOutageBallot(outage)
        if (err) {
            return [null, err]
        }
        return [ballotId, null]
    }

    const createOutageBallot = async (outage: OutageFields): BackendResponse<number | undefined> => {
        if (outage.statusId && outage.statusId === OutageStatusId.NominalStated) {
            return api.postHandler<number | undefined>('/api/vote/nps/new' + outage.id, undefined, undefined)
        }
        return [undefined, null]
    }

    /**
     * gets detailed information about a ballot
     * @param ballotId id of the ballot
     */
    const getBallot = async (ballotId: number): BackendResponse<ballot> => {
        return api.getHandler('/api/vote/ballot/' + ballotId, undefined)
    }

    /**
     * return current result of a voting ballot
     * @param ballotId id of the ballot
     */
    const getNpsResults = async (ballotId: number): BackendResponse<npsBallots> => {
        return api.getHandler(`/api/vote/nps/counting/${ballotId}`, undefined)
    }

    /**
     * check if a ballot is still open
     * @param ballot id of the ballot to check
     * @returns true if new votes are still accepted
     */
    const isBallotOpen = (ballot: ballot): boolean => {
        const { now, parseDate } = useDate()
        if (ballot !== null) {
            if (ballot.endsAt && parseDate(ballot.endsAt).isAfter(now) && ballot.deletedAt === null) {
                return true;
            } else if (ballot.endsAt === null && ballot.deletedAt === null) {
                return true
            } else {
                return false
            }
        }
        return false
    }

    const getFeedStats = (outageId: number): BackendResponse<ToBeDefined> => {
        return api.getHandler('/api/outage/feedbacks/stats/' + outageId, undefined)
    }

    return { npsVote, getBallot, getNpsResults, isBallotOpen, getOutageBallot, getFeedStats }
}

export { useVote }
