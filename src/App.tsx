import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from "./pages/login/Login";
import { ToastContextProvider } from "./contexts/ToastContext";
import { CallHelpdeskModal } from "./components/common/CallHelpdeskModal";
import { HelpdeskContextProvider } from "./contexts/HelpdeskContext";
import { MustAuthenticate } from "./router/MustAuthenticate";

//context providers
import ApiProvider from "./contexts/ApiProvider";

//pages
import { Layout } from "./pages/Layout"
import { PageNotFound } from "./components/utils/BigMessages";
import Home from "./pages/home/Home";

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
  return (
    <>
      <ApiProvider>
        <ToastContextProvider>
          <HelpdeskContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<MustAuthenticate><Home /></MustAuthenticate>} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="login" element={<AuthenticationPage />} />
              </Routes>
            </BrowserRouter>
          </HelpdeskContextProvider>
          <CallHelpdeskModal />
        </ToastContextProvider>
      </ApiProvider>
    </>
  )
}

export default App