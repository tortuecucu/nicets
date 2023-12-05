import { Outlet, } from "react-router-dom";
import configData from "../config.json";
import Login from '../components/common/Login';
import { Head } from "../components/common/Head";
import { CallHelpdeskModal } from "../components/common/CallHelpdeskModal";
import { HelpdeskContextProvider } from "../contexts/HelpdeskContext";
import { ToastContextProvider } from "../contexts/ToastContext";
import { useUser } from "../api/useUser";
import { PageLoader } from "../components/utils/PulseLoader";

function Foot() {
  return (
    <>
      <div className="container">
        <footer>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href={configData.HOME_URL} className="nav-link px-2 text-body-secondary">Accueil</a></li>
            <li className="nav-item"><a href={configData.SNOW_URL} className="nav-link px-2 text-body-secondary" target="_blank" rel="noreferrer">ServiceNow</a></li>
            <li className="nav-item"><a href="https://safran.service-now.com/safrangroup?id=btic_my_cases" className="nav-link px-2 text-body-secondary" target="_blank" rel="noreferrer">Mes demandes</a></li>
          </ul>
          <p className="text-center text-body-secondary fs-6">© 2023 Safran Nacelles</p>
        </footer>
      </div>
    </>
  )
}

const Layout = () => {
  const { isLogged, isConnecting } = useUser()

  return (
    <>
      <ToastContextProvider>
        <HelpdeskContextProvider>
          <Head />
          <main className="container">
            {isConnecting && <PageLoader />}
            {(!isConnecting && isLogged) && <Outlet />}
            {(!isConnecting && isLogged) && <Login />}
            <Foot />
          </main>
        </HelpdeskContextProvider>
      </ToastContextProvider>
      <CallHelpdeskModal />
    </>
  )
};

export { Layout };