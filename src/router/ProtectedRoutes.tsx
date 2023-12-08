import { ProtectedRoute, ProtectedLazyRoute } from "./Watchdog"


type ProtectedRoutesProps = {
    children: React.ReactNode
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {
    return(<>
        {props.children}
    </>)
}
ProtectedRoutes.Route = ProtectedRoute
ProtectedRoutes.LazyRoute = ProtectedLazyRoute

export {ProtectedRoutes}