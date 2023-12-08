import { useMemo } from "react";
import { useAuth } from "../hooks/backend/useAuth";
import { ReactNode, lazy } from 'react'
import { Route } from "react-router-dom";

const NoRightRole = () => {
    return (<>
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
                <svg height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg" id="fi_2760975"><g id="Flat"><path d="m384 456-64 32-88-144v144h-168a40 40 0 0 1 -40-40v-160a48 48 0 0 1 48-48h140.67a64 64 0 0 1 54.16 29.9z" fill="#34507b"></path><path d="m72 88v152h112a24 24 0 0 0 24-24v-48h32l-32-80z" fill="#fec9a3"></path><path d="m176 144a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16z" fill="#7a432a"></path><path d="m208 88h-80l-8 24h-7.731a20.838 20.838 0 0 0 -20.215 15.784 20.836 20.836 0 0 0 10.9 23.691l1.046.525-32 32v-96a40 40 0 0 1 40-40h56a40 40 0 0 1 40 40z" fill="#7a432a"></path><path d="m232 44.12a20.251 20.251 0 0 1 -.38 3.88 19.8 19.8 0 0 1 -1.06 3.6l-14.56 36.4h-144l-14.56-36.4a20.116 20.116 0 0 1 18.68-27.6h135.76a20.123 20.123 0 0 1 20.12 20.12z" fill="#34507b"></path><path d="m128 88 4.937 2.821a221.462 221.462 0 0 0 109.875 29.179 13.189 13.189 0 0 0 13.188-13.188 13.188 13.188 0 0 0 -10.6-12.932l-29.4-5.88z" fill="#283f61"></path><path d="m176 184h32v16h-32z" fill="#feb784"></path><path d="m96 56h104v16h-104z" fill="#283f61"></path><path d="m231.62 48a19.8 19.8 0 0 1 -1.06 3.6l-14.56 36.4h-4a20 20 0 0 1 -20-20 20 20 0 0 1 20-20z" fill="#ffb531"></path><path d="m215.172 381.242a14.591 14.591 0 0 0 2.645 19.172l102.183 87.586h24v-24l-107.572-86.058a14.591 14.591 0 0 0 -21.256 3.3z" fill="#348fd9"></path><path d="m232 424 40-16 32 24v56h-72z" fill="#fec9a3"></path><path d="m443.48 488h-139.08a16.138 16.138 0 0 1 -16.236-18.263l28.116-192a16.276 16.276 0 0 1 16.24-13.737h139.08a16.138 16.138 0 0 1 16.236 18.263l-28.116 192a16.276 16.276 0 0 1 -16.24 13.737z" fill="#d75246"></path><path d="m474 352h-25.811a16 16 0 0 0 -15.689 12.862l-10.078 50.392a14 14 0 0 0 13.728 16.746h25.806a16 16 0 0 0 15.689-12.862l10.079-50.392a14 14 0 0 0 -13.724-16.746z" fill="#fec9a3"></path><path d="m427.086 248 2.029-8c2.242-8.837-3.21-16-12.176-16-8.966 0-18.052 7.163-20.293 16l-2.03 8h-16.235c-8.966 0-18.051 7.163-20.293 16l-6.088 24h97.408l6.088-24c2.242-8.837-3.209-16-12.176-16z" fill="#348fd9"></path><rect fill="#283f61" height="32" rx="8" width="16" x="224" y="320"></rect><path d="m200 240-33.7 61.79-14.3 26.21-22.54-24.79-57.46-63.21z" fill="#d6d6d4"></path><path d="m160 264 6.3 37.79-14.3 26.21-22.54-24.79 6.54-39.21-16-24h48z" fill="#283f61"></path><path d="m243.62 247.98-131.62 240.02h-48l136-248h12.67a64.025 64.025 0 0 1 30.95 7.98z" fill="#e0e0de"></path><path d="m192 416h40v72h-40z" fill="#e0e0de"></path><path d="m88 416v-96h-64v128a40 40 0 0 0 40 40h128v-72z" fill="#34507b"></path><g fill="#283f61"><path d="m144 448h16v16h-16z"></path><path d="m112 448h16v16h-16z"></path><path d="m96 416h-16v-88a8 8 0 0 1 8-8 8 8 0 0 1 8 8z"></path></g></g></svg>
                <h1 className="text-body-emphasis">Minute papillon !</h1>
                <p className="col-lg-8 mx-auto fs-5 text-muted">Vous n'avez pas les droits suffisants pour aller plus loin...</p>
                <div className="d-inline-flex gap-2 mb-5">
                    <a href="/" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">Retour à l'accueil</a>
                </div>
            </div>
        </div>
    </>)
}

type WatchdogProps = {
    children: ReactNode,
    fallback?: ReactNode,
    requiredRoles: Array<string>
}

const Watchdog = (props: WatchdogProps) => {
    const { roles, isAuthenticated } = useAuth()

    const granted = useMemo(() => {
        return isAuthenticated && props.requiredRoles.some(role => roles.includes(role));
    }, [roles])

    return (<>
        {(granted) ? props.children : props.fallback}
    </>)
}
Watchdog.defaultProps = {
    fallback: <NoRightRole />
}

type ProtectedRouteProps = {
    path: string,
    element: ReactNode,
    requiredRoles: Array<string>,
    fallback?: ReactNode,
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    return (<>
        <Watchdog fallback={props.fallback} requiredRoles={props.requiredRoles}>
            <Route path={props.path} element={props.element} />
        </Watchdog>
    </>)
}

type ProtectedLazyRouteProps = {
    path: string,
    elementPath: string,
    requiredRoles: Array<string>,
    fallback?: ReactNode,
}

const ProtectedLazyRoute = (props: ProtectedLazyRouteProps) => {
    const Element = lazy(() => import(props.elementPath));
    return (<>
        <Watchdog fallback={props.fallback} requiredRoles={props.requiredRoles}>
            <Route path={props.path} element={<Element />} />
        </Watchdog>
    </>)
}

export { Watchdog, NoRightRole, ProtectedRoute, ProtectedLazyRoute }