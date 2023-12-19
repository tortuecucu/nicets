import { useApi } from "../../contexts/ApiProvider"
import { useState } from "react"
import Cookies from 'js-cookie';
import { useMount } from "../custom/useMount";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const api = useApi()
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const connect = async () => {
        const success = await api.connect()
        if (success) {
            setIsAuthenticated(success)
        }
    }

    //try to connect using JWT token
    useMount(() => {
        connect()
    })

    const invalidate = () => {
        setIsAuthenticated(false)
    }

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


    return { logIn, logOut, isAuthenticated }
}

export { useAuth }