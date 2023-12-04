import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout} from "./pages/Layout";
import Home from "./pages/Home";
import Notify from "./pages/outage/Notify";
import Feedback from "./pages/outage/Feedback";
import State from "./pages/outage/State";
import Outage from "./pages/outage/Outage";
import ApiProvider from "./contexts/ApiProvider";
import { Watchdog, Fallback } from "./components/utils/Watchdog";
import { PageNotFound } from "./components/utils/BigMessages";
import { lazy } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './index.css';

import Test from "./pages/Test";

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
    <BrowserRouter>
      <ApiProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
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
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('nice'));
root.render(<App />);