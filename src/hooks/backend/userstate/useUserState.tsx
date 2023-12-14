import { StateCaptions,  UserState, Verb } from "src/types/userstate"
import { CAPTIONS } from "./captions"
import { OutageType } from "src/types/outage"
import { useStorage } from "src/hooks/custom/useStorage"
import { useBackend } from "../useBackend"
import { useToastContext } from "src/contexts/ToastContext"

const useUserState = () => {

    const postState = async (state: UserState): Promise<boolean> => {
        const { postHandler } = useBackend()

        const [response, err] = await postHandler<boolean>(
            '/api/outage/feedbacks/' + state.outageId,
            {
                step: state.verb.toString().toLowerCase(),
                feedbacck: state.feedback
            }
        )

        if (err || response === null) {
            return false
        }
        return true
    }

    const userState = async (state: UserState): Promise<boolean> => {
        const { retryLater, successToast } = useToastContext()
        const success = await postState(state)

        if (success) {
            successToast('Merci !', 'Votre bonne action compte !')
            setPosted(state.verb, state.outageId)
        } else {
            retryLater()
        }

        return success
    }

    const captions = (verb: Verb): StateCaptions | undefined => {
        return CAPTIONS.find(c => c.id === verb)
    }

    const validateVerb = (candidate: Verb, outage: OutageType): Verb => {
        return candidate //TODO: code it
    }

    const wasPosted = async (verb: Verb, outageId: number): Promise<boolean> => {
        const { get } = useStorage<boolean>(`userState#${outageId}-${verb}`)
        return (get() !== undefined)
    }

    const setPosted = async (verb: Verb, outageId: number): Promise<void> => {
        const { set } = useStorage<boolean>(`userState#${outageId}-${verb}`)
        set(true)
        return
    }

    const isOutageEligible = (outage: OutageType): boolean => {
        return true //TODO: code it
            // if (outage && id===1 && outage.statusId === 4) {
    //   id= 2
    // } else if (outage.statusId === 5) {
    //   id=3
    // } else if (outage && id===2 && outage.statusId < 4) {
    //   id=1
    // } 
    }

    const getVerb = (name: string): Verb | undefined => {
        const verbs = Object.keys(Verb).map(n => {
            return {
                name: n,
                value: Verb[n as keyof typeof Verb]
            }
        })
        const match = verbs.find(v => v.name === name)
        if (match) {
            return match.value
        }
        return undefined
    }

    return { postState: userState, captions, wasPosted, getVerb }
}

export { useUserState }