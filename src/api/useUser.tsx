import { useApi } from "../contexts/ApiProvider"
import { useState, useEffect, useMemo } from "react"

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

type Credentials = {
    email: string,
    code: number
}

const useUser = () => {
    const api = useApi()
    const [credentials, setCredentials] = useState<Credentials>()
    const [profile, setProfile] = useState<UserProfile>()
    const [roles, setRoles] = useState<Array<string>>([])

    const invalidate = () => {
        setProfile(undefined)
        setCredentials(undefined)
        setRoles([])
    }

    //updates user profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (credentials) {
                const success = await api.login(credentials.email, credentials.code)
                if (success) {
                    const data = await api.getProfile()
                    setProfile(data)
                }
            }
            if (!profile) {
                invalidate()
            }
        }
        fetchProfile()
    }, [credentials])

    //updates user roles
    useEffect(()=>{
        const fetchRoles = async () => {
            if (credentials) {
                const data = await api.getMyRoles()
                setRoles([...data])
            }
        }
        fetchRoles()
    }, [credentials])


    /**
     * logs the user in
     * @param email email @safrangroup.com of the user
     * @param code invitation code of the user
     */
    const logIn = (email: string, code: number): void => {
        setCredentials({
            email: email,
            code: code
        })
    }

    /**
     * logs the current user out
     */
    const logOut = (): void => {
        invalidate()
    }

    /**
     * indicates is an user is currently connected to backend service
     */
    const isLogged = useMemo<boolean>(()=>{
        return profile !== undefined
    }, [profile])

    return { profile, logIn, logOut, isLogged, roles }
}

export type {UserProfile}
export { useUser}