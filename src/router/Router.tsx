import { useRoutes } from "react-router-dom";
import PageNotFound from "src/pages/public/PageNotFound";
import { RouteObject } from "react-router-dom";
import { useAuth } from "src/hooks/backend/useAuth";
import { useAdminRoutes } from "src/admin/hooks/useAdminRoutes";
import { Layout } from "src/pages/layout/PageLayout";
import { PageLogin } from "src/pages/login/PageLogin";
import { LayoutMode } from "src/types/layout";
import PageHome from "src/pages/home/PageHome";
import LazyLoader from "src/router/LazyLoader";

const NOT_LOGGED_ROUTES: RouteObject[] = [
    {
        path: "/",
        element: <Layout mode={LayoutMode.PUBLIC}  />,
        children: [
            { path: "/", index: true, element: <PageLogin /> },
            { path: "*", element: <PageNotFound /> }
        ]
    }
]

const LOGGED_ROUTES: RouteObject[] = [
    {
        path: "/",
        element: <Layout mode={LayoutMode.LOGGED}  />,
        children: [
            { path: "/", index: true, element: <PageHome /> },
            { path: "performance", element: <LazyLoader path="src/pages/performance/PagePerformance" /> },
            { path: "profile", element: <LazyLoader path="src/pages/PageUserProfile" /> },
            { path: "contribute", element: <LazyLoader path="src/pages/PageContribute" /> },
            { path: "nice", element: <LazyLoader path="src/pages/PageNice" />},
            { path: "how-to", element: <LazyLoader path="src/pages/PageHowTo" />},
            { path: "notify/:id/:value?", element: <LazyLoader path="src/pages/outage/PageNotify" />},
            { path:"impact/:id?", element: <LazyLoader path="src/pages/outage/impact/PageImpact" />},
            { path:"outage/:id?", element: <LazyLoader path="src/pages/outage/PageOutage" />},
            { path:":verb/:outageid/:value?", element: <LazyLoader path="src/pages/outage/userfeedback/PageState" />},
            { path:"satisfaction/:id", element: <LazyLoader path="src/pages/outage/satisfaction/PageSatisfaction" />},
            { path: "*", element: <PageNotFound /> }
        ]
    }
]

const Router = () => {
    const { connect } = useAuth();
    const { routes: adminRoutes } = useAdminRoutes();

    const routes = (connect()) ? [...adminRoutes, ...LOGGED_ROUTES] : NOT_LOGGED_ROUTES

    return useRoutes(routes)
}

export default Router