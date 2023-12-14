import { BackendBooleanResponse, BackendResponse, ToBeDefined } from "src/types/common"
import { OutageType } from "src/types/outage"
import { ballot, npsBallots, npsForm, npsPayload } from "src/types/satisfaction"


const useVote = () => {
    /**
     * add a new nps vote
     * @param ballotId id of the ballot
     * @param note satisfaction 0 to 10
     * @param comment free text
     * @param payload additionnal information that explain the note
     */
    const npsVote = async (ballotId: number, vote: npsForm): BackendResponse<boolean> => {
        return [true, null]
    }

    /**
     * return the id of the ballot that is linked to the given incident
     * @param outageId id of the ballot
     * @returns ballot object
     */
    const getOutageBallot = async (outage: OutageType): BackendResponse<number | undefined> => {
        return [0, null]
    }

    /**
     * gets detailed information about a ballot
     * @param ballotId id of the ballot
     */
    const getBallot = async (ballotId: number):  BackendResponse<ballot> => {}

    /**
     * return current result of a voting ballot
     * @param ballotId id of the ballot
     */
    const getNpsResults = async (ballotId: number): BackendResponse<npsBallots> => {}

    /**
     * check if a ballot is still open
     * @param ballot id of the ballot to check
     * @returns true if new votes are still accepted
     */
    const isBallotOpen = (ballot: ballot): boolean => {
        return true //TODO: code it
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
    }

    return {npsVote, getBallot, getNpsResults, isBallotOpen, getOutageBallot}
}

export {useVote}