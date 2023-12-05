import { useApi } from "../contexts/ApiProvider"
import { useState, useEffect} from "react"
import Cookies from 'js-cookie';
import { useMount } from "../hooks/useMount";

type UserProfile = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    site: {
        id: number,
        name: string,
        countryCode: string
    },
    company: {
        id: number,
        name: string,
        trigra: string
    }
}

const useUser = () => {
    const api = useApi()
    const [profile, setProfile] = useState<UserProfile>()
    const [roles, setRoles] = useState<Array<string>>([])
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(true)

    //try to connect using JWT token
    useMount(() => {
        const connect = async () => {
            setIsConnecting(true)
            const success = await api.connect()
            setIsLogged(success)
            setIsConnecting(false)
        }
        connect()
    })

    const invalidate = () => {
        setIsLogged(false)
        setProfile(undefined)
        setRoles([])
    }

    //updates user profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (isLogged) {
                const data = await api.getProfile()
                setProfile(data)
            }
        }
        fetchProfile()
    }, [isLogged])

    //updates user roles
    useEffect(() => {
        const fetchRoles = async () => {
            if (isLogged) {
                const data = await api.getMyRoles()
                setRoles([...data])
            }
        }
        fetchRoles()
    }, [profile])

    /**
     * logs the user in
     * @param email email @safrangroup.com of the user
     * @param code invitation code of the user
     */
    const logIn = (email: string, code: number): void => {
        api.login(email, code)
        .then((success: boolean) => {
            if (success) {
                setIsLogged(true)
            } else {
                invalidate()
            }
        })
    }

    /**
     * logs the current user out
     */
    const logOut = (): void => {
        invalidate()
        Cookies.remove('rat');
        Cookies.remove('nat');
    }

    /**
     * indicates is an user is currently connected to backend service
     */


    return { profile, logIn, logOut, isLogged, roles, isConnecting }
}

export type { UserProfile }
export { useUser }