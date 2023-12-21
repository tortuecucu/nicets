import React from 'react'
import { useAuth } from '../hooks/backend/useAuth'
import { Navigate } from 'react-router-dom'
import { ChildrenProp } from 'src/types/common'

/**
 * 
 */
type MustAuthenticateProps = {
    loginRoute: string,
    children: ChildrenProp
}

/**
 * Render its children only if user is authenticated
 * Otherwise, displays the login page
 * @param props MustAuthenticateProps
 */
const MustAuthenticate = (props: MustAuthenticateProps): React.ReactNode => {
    const { connect } = useAuth()

    if (connect() === true) {
        return(<>{props.children}</>)
    } else {
        return(<Navigate to={props.loginRoute}/>)
    }

}
MustAuthenticate.defaultProps = {
    loginRoute: "login"
}

export { MustAuthenticate }