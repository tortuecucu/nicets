import React from 'react'
import { useAuth } from '../hooks/backend/useAuth'
import { Navigate } from 'react-router-dom'

/**
 * 
 */
type MustAuthenticateProps = {
    loginRoute: string,
    children: React.ReactNode
}

/**
 * Render its children only if user is authenticated
 * Otherwise, displays the login page
 * @param props MustAuthenticateProps
 */
const MustAuthenticate = (props: MustAuthenticateProps): React.ReactNode => {
    const { isAuthenticated } = useAuth()
    return (<>
        {props.children}
        {/* { isAuthenticated &&  }
        {isAuthenticated===false && <Navigate to={props.loginRoute}/>} */}
    </>)
}
MustAuthenticate.defaultProps = {
    loginRoute: "login"
}

export { MustAuthenticate }