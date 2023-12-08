import { useApi } from "../../contexts/ApiProvider"
import { useState, useEffect} from "react"
import Cookies from 'js-cookie';
import { useMount } from "../custom/useMount";
import { useNavigate } from "react-router-dom";


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

const useAuth = () => {
    const api = useApi()
    const navigate = useNavigate()
    const [profile, setProfile] = useState<UserProfile>()
    const [roles, setRoles] = useState<Array<string>>([])
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(true)

    //try to connect using JWT token
    useMount(() => {
        const connect = async () => {
            setIsConnecting(true)
            const success = await api.connect()
            console.info(success)
            setIsAuthenticated(success)
            setIsConnecting(false)
        }
        connect()
    })

    const invalidate = () => {
        setIsAuthenticated(false)
        setProfile(undefined)
        setRoles([])
    }

    //updates user profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (isAuthenticated) {
                const data = await api.getProfile()
                setProfile(data)
            }
        }
        fetchProfile()
    }, [isAuthenticated])

    //updates user roles
    useEffect(() => {
        const fetchRoles = async () => {
            if (isAuthenticated) {
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
                setIsAuthenticated(true)
                navigate('/')
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
        navigate('login')
    }

    /**
     * indicates is an user is currently connected to backend service
     */


    return { profile, logIn, logOut, isAuthenticated, roles, isConnecting }
}

export type { UserProfile }
export { useAuth}