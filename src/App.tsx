import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from "src/pages/login/Login";
import { MustAuthenticate } from "src/router/MustAuthenticate";
import { lazy } from "react";

//pages
import { Layout } from "src/pages/Layout"
import { PageNotFound } from "src/components/utils/BigMessages";
import Home from "src/pages/home/Home";
import Outage from "src/pages/outage/Outage";

const Nice = lazy(() => import('src/pages/Nice'));
const Contribute = lazy(() => import('src/pages/Contribute'));
const Performance = lazy(() => import('src/pages/Performance'));

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ContextsProvider } from "src/contexts/ContextsProvider";

function App() {
  return (
    <>
      <ContextsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MustAuthenticate><Layout /></MustAuthenticate>}>
              <Route index element={<Home />} />
              <Route path="outage/:id?" element={<Outage />} />
              <Route path="performances" element={<Performance />} />
              <Route path ="contribute" element={<Contribute />} />
              <Route path="nice" element={<Nice />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="login" element={<AuthenticationPage />} />
          </Routes>
        </BrowserRouter>
      </ContextsProvider>
    </>
  )
}

export default App