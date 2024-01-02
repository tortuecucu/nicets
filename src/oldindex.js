import Notify from "./pages/outage/Notify";
import Feedback from "./pages/outage/satisfaction/Satisfaction";
import State from "./pages/outage/userfeedback/State";
import OutageType from "./pages/outage/Outage";

const UserProfile = lazy(() => import('./pages/UserProfile'));
const Impact = lazy(() => import("./pages/outage/impact/Impact"));
const Performance = lazy(() => import("./pages/Performance"));
const HowTo = lazy(() => import("./pages/HowTo"));
const Contribute = lazy(() => import("./pages/Contribute"));
const Nice = lazy(() => import("./pages/Nice"));
const NewsEditor = lazy(() => import("./admin/news/News"));
const IncidentEditor = lazy(() => import("./admin/incidents/Incident"));
const MaintenanceEditor = lazy(() => import("./admin/maintenance/Maintenance"));
const UsersEditor = lazy(() => import("./admin/users/UsersEditor"));

export default function App() {
  return (
    <BrowserRouter>//
      <ApiProvider>//
        <Routes>//



          <Route path="notify/:id/:value?" element={<Notify />} />
          <Route path="feedback/:id" element={<Feedback />} />
          <Route path="impact/:id?" element={<Impact />} />
          <Route path=":verb/:outageid/:value?" element={<State />} />
context

          <Route path="profile" element={<UserProfile />} />
          <Route path="how-to" element={<HowTo />} />



          <Route path="edit/incident" element={<Watchdog roles={'incident-admin'} fallback={Fallback}><IncidentEditor /></Watchdog>} />
          <Route path="edit/news" element={<Watchdog roles='data-admin' fallback={Fallback}><NewsEditor /></Watchdog>} />
<Route path="edit/maintenance" element={<Watchdog roles='data-admin' fallback={Fallback}><MaintenanceEditor /></Watchdog>} />          
          <Route path="edit/users" element={<Watchdog roles='user-admin' fallback={Fallback}><UsersEditor /></Watchdog>} />



          

        </Route>//
      </Routes>//
    </ApiProvider>//
    </BrowserRouter >//
  );
}
