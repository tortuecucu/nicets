import { RouteObject } from "react-router-dom";
import useAccount from "src/hooks/backend/useAccount";
import LazyLoader from "src/router/LazyLoader";

type AdminRoute = {
    role: string,
    route: RouteObject
}

const ROUTES: AdminRoute[] = [
    { role: 'incident-admin', route: {
        path: "admin/incident",
        element: <LazyLoader path="src/admin/incidents/Incident" /> ,
    }},
    { role: 'data-admin', route: {
        path: "admin/news",
        element: <LazyLoader path="src/admin/news/News" />,
    }},
    { role: 'data-admin', route: {
        path: "admin/maintenance",
        element: <LazyLoader path="src/admin/maintenance/Maintenance" />,
    }},
    { role: 'user-admin', route: {
        path: "admin/users",
        element: <LazyLoader path="src/admin/users/UsersEditor" />,
    }},
] 

const useAdminRoutes = () => {
    const { getRoles } = useAccount();
    const roles = getRoles();

    const routes: RouteObject[] = ROUTES.filter(route => roles.includes(route.role)).map(route => route.route);

    return { routes }
}

export {useAdminRoutes}