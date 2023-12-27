import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from "src/pages/login/Login";
import { ContextsProvider } from "src/contexts/ContextsProvider";
import LazyLoader from "./router/LazyLoader";
import Base from "./router/Base";

//pages
import { Layout } from "src/pages/Layout"
import { PageNotFound } from "src/components/utils/BigMessages";
import Home from "src/pages/home/Home";
import Outage from "src/pages/outage/Outage";


//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";


function App() {
  return (
    <>
      <ContextsProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Base />} />
            <Route path="admin" element={<LazyLoader path="src/editors/AdminLayout" />}>
              <Route path="users" element={<>users</>} />
            </Route>
            <Route path="login" element={<AuthenticationPage />} />
            <Route path="contribute" element={<LazyLoader path="src/pages/Contribute" />} />
            <Route path="nice" element={<LazyLoader path="src/pages/Nice" />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path=":trigram" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="outage/:id?" element={<Outage />} />
              <Route path="performances" element={<LazyLoader path="src/pages/Performance" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextsProvider>
    </>
  )
}

export default App