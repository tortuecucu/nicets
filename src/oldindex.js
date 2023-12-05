import Notify from "./pages/outage/Notify";
import Feedback from "./pages/outage/Feedback";
import State from "./pages/outage/State";
import Outage from "./pages/outage/Outage";

const UserProfile = lazy(() => import('./pages/UserProfile'));
const Impact = lazy(()=> import("./pages/outage/Impact"));
const Performance = lazy(() => import("./pages/Performance"));
const HowTo = lazy(()=> import("./pages/HowTo"));
const Contribute = lazy(()=> import("./pages/Contribute"));
const Nice = lazy(()=> import("./pages/Nice"));
const NewsEditor = lazy(()=>import("./editors/news/News"));
const IncidentEditor = lazy(()=>import("./editors/incidents/Incident"));
const MaintenanceEditor = lazy(()=>import("./editors/maintenance/Maintenance"));
const UsersEditor = lazy(()=>import("./editors/users/UsersEditor"));

export default function App() {
  return (
    <BrowserRouter>//
      <ApiProvider>//
          <Routes>//

              <Route path="test" element={<Test />}/>
              <Route path="dashboard" element={<Performance />} />
              <Route path="profile" element={<UserProfile />}/>
              <Route path="contribute" element={<Contribute/>} />
              <Route path="how-to" element={<HowTo />} />
              <Route path="nice" element={<Nice />} />
              <Route path="edit/incident" element={<Watchdog roles={'incident-admin'} fallback={Fallback}><IncidentEditor/></Watchdog> } />
              <Route path="edit/news" element={<Watchdog roles='data-admin' fallback={Fallback}><NewsEditor /></Watchdog> }/>
              <Route path="edit/maintenance" element={<Watchdog roles='data-admin' fallback={Fallback}><MaintenanceEditor /></Watchdog> }/>
              <Route path="edit/users" element={<Watchdog roles='user-admin' fallback={Fallback}><UsersEditor /></Watchdog> }/>
              <Route path="notify/:id/:value?" element={<Notify />} />
              <Route path="feedback/:id" element={<Feedback />} />
              <Route path="impact/:id?" element={<Impact />} />
              <Route path="outage/:id?" element={<Outage />} />
              <Route path=":verb/:outageid/:value?" element={<State />} />

            </Route>//
          </Routes>//
      </ApiProvider>//
    </BrowserRouter>//
  );
}
