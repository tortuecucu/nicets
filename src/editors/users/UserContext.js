import { createContext, useState } from "react";
import { Searcher } from "../../components/utils/Searcher";
import { useAdminUser } from "../../api/useAdminUser";

const UserContext = createContext({})

const UserContextWrapper = (props) => {
    const [user, setUser] = useState(undefined)
    const { searchUsers, fetchUser } = useAdminUser()

    const selectCallback = (userInfos) => {
        const user = fetchUser(userInfos.id)
        setUser(user)
    }

    const resetUser = () => {
        setUser(undefined)
    }

    const fetchUsers = async (search) => {
        const {data} = await searchUsers(search)
        return data
    }

    return (
        <>
            <UserContext.Provider value={{ user, resetUser }}>
                {(!user) && <Searcher fetcher={fetchUsers} onSelect={selectCallback} label="Email de l'utilisateur" />}
                {(user) && props.children}
            </UserContext.Provider>
        </>
    )
}

export { UserContextWrapper, UserContext }