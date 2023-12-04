import { useState, useContext, Fragment, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import configData from "../../config.json";
import { useApi } from '../../contexts/ApiProvider';
import { HeartPulse, ExclamationTriangle, InfoCircle, Person, LightbulbFill, Speedometer2 } from "react-bootstrap-icons";
import { SearchNoResult } from './Search';

const HelpdeskContext = createContext();

function Head({ outageCount, logged }) {
    const api = useApi();
    const { showHelpdesk } = useContext(HelpdeskContext);
    const [modal, setModal] = useState({});
  
    function clickHelpdesk(e) {
      e.preventDefault();
      showHelpdesk(true);
    }
  
    function searchChanged(e) {
      let input = document.getElementById('searchNumber').value.trim();
      if (input.length >= 13) {
        searchIncident(e);
      }
    }
  
    function closeModal() {
      setModal({
        show: false,
        title: "",
        content: <></>
      });
    }
  
    async function searchIncident(e) {
      e.preventDefault();
      let input = document.getElementById('searchNumber').value.trim().toUpperCase();
      const regex = new RegExp(configData.INCT_REGEX);
      if (regex.test(input)) {
        const [outage, err] = await api.getOutageByNumber(input);
        if (err) {
          console.error(err);
        } else if (outage) {
          window.location.href = configData.HOME_URL + '/outage/' + outage.id;
        }
        return
      }
  
      setModal({
        show: true,
        title: "Nous sommes bredouilles",
        content: <SearchNoResult search={input}/>
      });
  
    }
  
    return (
      <>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href={configData.HOME_URL}><HeartPulse /> NICE <span className="fw-lighter">POC</span></a>
            <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              {logged && <Fragment>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" id="searchNumber" placeholder="INCT00000000" onChange={searchChanged}></input>
                  <button className="btn btn-outline-light" type="submit" onClick={searchIncident}>Go!</button>
                </form>
              </Fragment>}
            </div>
          </div>
        </nav>
  
        <div className="nav-scroller bg-body shadow-sm">
          <nav className="nav">
            <a className="nav-link active" title="Listes toutes les perturbations actuelles du système d'information" href={configData.HOME_URL}>Perturbations
              {outageCount !== null && <> <span className="badge text-bg-danger rounded-pill align-text-bottom">{outageCount}</span></>}
            </a>
            <a className="nav-link text-danger" title="Appeler le support informatique" href="#" onClick={clickHelpdesk}><ExclamationTriangle color="#DC3545" width={18} height={18} /> Une urgence ?</a>
            {logged && <><a className="nav-link" title="Vous assiste afin d'exprimer votre besoin de support de la meilleure manière" href={configData.HOME_URL + "/how-to"}><InfoCircle /> Assistant</a></>}
            {logged && <><a className="nav-link ms-auto text-success fw-bold" href={configData.HOME_URL + "/contribute"}><LightbulbFill /> J'améliore !</a></>}
            {logged && <><a className="nav-link" href={configData.HOME_URL + "/dashboard"}><Speedometer2 /> Notre performance</a></>}
  
            {logged && <><a className="nav-link" href={configData.HOME_URL + "/profile"}><Person /> Mon profil</a></>}
          </nav>
        </div>
        <Modal show={modal.show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modal.content}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  export {Head, HelpdeskContext}