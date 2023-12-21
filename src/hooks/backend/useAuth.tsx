import { useApi } from "../../contexts/ApiProvider"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const api = useApi()
    const navigate = useNavigate()

    const connect = () => {
        return api.connect()
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
                    navigate('/')
                } 
            })
            .catch(err => console.error(err))
    }

    /**
     * logs the current user out
     */
    const logOut = (): void => {
        Cookies.remove('rat');
        Cookies.remove('nat');
        navigate('login')
    }

    /**
     * indicates is an user is currently connected to backend service
     */


    return { logIn, logOut, connect }
}

export { useAuth }