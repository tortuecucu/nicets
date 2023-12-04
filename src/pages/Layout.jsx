import { Outlet, } from "react-router-dom";
import { createContext, useState, useContext, useEffect, Fragment, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from "react-qr-code";
import configData from "../config.json";
import { useApi } from '../contexts/ApiProvider';
import Login from '../components/common/Login';
import { Toast } from "primereact/toast";
import { HelpdeskContext } from "../components/common/Head";

import { Head } from "../components/common/Head";

const ToastContext = createContext();

function Helpdesk({ show }) {
  const { helpdesk, showHelpdesk } = useContext(HelpdeskContext);
  function handleClose() {
    showHelpdesk(false);
  }
  return (
    <>
      <Modal show={helpdesk} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>En cas d'urgence, j'appelle le Helpdesk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="text-center">
              <p className="fs-3 fw-bold">02 35 11 41 42</p>
              <QRCode value="tel:+335114142" size={180} />
              <p className="text-muted">scannez pour appeler</p>
              <p className="lead">Le Helpdesk est à votre écoute 24h/24 7jours/7</p>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

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
  const [helpdesk, showHelpdesk] = useState(false);
  const [actives, setActives] = useState(null);
  const [logged, setLogged] = useState(false);
  const api = useApi();
  const toast = useRef()

  const showToast = (message) => {
    try {
      toast.current.show(message);
    } catch (e) {
      console.error(e)
    }
  }

  const loggedCallback = () => {
    setLogged(true);
  }

  useEffect(() => {
    (async () => {
      api.connect()
        .then(logged => {
          async function fetchLogged() {
            setLogged(logged);
            const [count, err] = await api.getActiveCounter();
            if (err) {
              console.error(err);
            } else if (Number.isInteger(count)) {
              setActives(count);
            } else {
              setActives(null);
            }
          }
          fetchLogged();
        })
        .catch(err => {
          console.error(err);
        })
    })();
  }, [api]);

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        <HelpdeskContext.Provider value={{ helpdesk, showHelpdesk }}>
          <Head outageCount={actives} logged={logged} />
          <Helpdesk />
          <main className="container">
            {logged ? (
              <Outlet />
            ) : (
              <Login loggedCallback={loggedCallback} />
            )}
            <Foot />
          </main>
          <Toast ref={toast} />
        </HelpdeskContext.Provider>
      </ToastContext.Provider>
    </>
  )
};

export { Layout, ToastContext };