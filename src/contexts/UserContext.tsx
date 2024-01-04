import { useContext, createContext, useState } from 'react';
import { UserProfile } from 'src/hooks/backend/useAccount';
import { ChildrenProp } from 'src/types/common';
import useAccount from 'src/hooks/backend/useAccount';
import { useAuth } from 'src/hooks/backend/useAuth';

export type BusinessUnitInfos = {
    id: number,
    parent: number,
    name: string,
}

export type UserContextContent = {
    profile?: UserProfile,
    hasRole: (role: string) => boolean,
}

type UserContextProviderProps = {
    children: ChildrenProp
}


const UserContext = createContext<UserContextContent>({profile: undefined, hasRole: (role: string) => false})

const UserContextProvider = (props: UserContextProviderProps) => {
    const { fetchProfile } = useAccount()
    const { connect } = useAuth()

    const [profile, setProfile] = useState<UserProfile>()

    if (connect()) {
        fetchProfile()
        .then((response) => {
            const [profile, error] = response
            if (error) {
                console.error(error)
            } else {
                setProfile(profile)
            }
        })
        .catch(err => console.error(err))
    }

    const hasRole = (role: string): boolean => {
        if (profile) {
            return profile.roles?.includes(role) ?? false
        }
        return false
    }

    return(
        <UserContext.Provider value={{profile: profile, hasRole: hasRole}} children={props.children} />
    )
}

const useUserContext = () => useContext(UserContext)

export {UserContext, UserContextProvider, useUserContext}