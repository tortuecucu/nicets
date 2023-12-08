import React from 'react';
import { Parameters, useConfig } from '../../hooks/config/useConfig';
import { HeartPulse, ExclamationTriangle, InfoCircle, Person, LightbulbFill, Speedometer2 } from "react-bootstrap-icons";
import { useHelpdeskContext } from '../../contexts/HelpdeskContext';
import { useForm } from 'react-hook-form';
import { useSearch } from '../../hooks/backend/useSearch';

function Head() {
  const config = useConfig()
  const { setShowModal } = useHelpdeskContext()
  
  function handleHelpdeskClick() {
    setShowModal(true);
  }

  const handleSearch = (search: string): void => {
    search = search.trim().toUpperCase()
    const regex = new RegExp(config.get(Parameters.INCT_REGEX));
    if (regex.test(search)) {
      const {getOutageByIncidentNumber} = useSearch()
      const outageId = getOutageByIncidentNumber(search)
      if (outageId!==undefined) {
        window.location.href = config.get(Parameters.HOME_URL) + '/outage/' + outageId; //FIXME: use router instead
      } else {
        alert('Incident non trouvé !') //FIXME: use toast instead
      }
    }
  }

  return (<HeadDumb form={<SearchForm onSubmit={handleSearch} />} onHelpdeskClicked={handleHelpdeskClick} />)
}

type SearchFormProps = {
  onSubmit: (input: string) => void
}

type SearchData = {
  input: string
}

const SearchForm = (props: SearchFormProps) => {
  const { register, handleSubmit } = useForm<SearchData>()

  const handleSearch = (data: SearchData) => {
    if (data.input.length >= 13) {
      props.onSubmit(data.input)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="d-flex" role="search">
      <input className="form-control me-2" type="search" id="searchNumber" placeholder="INCT00000000" {...register("input", { required: true })}></input>
      <button className="btn btn-outline-light" type="submit">Go!</button>
    </form>
  )
}

type HeadDumbProps = {
  form: React.ReactNode,
  onHelpdeskClicked: () => void
}

const HeadDumb = (props: HeadDumbProps) => {
  const config = useConfig()
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href={config.get(Parameters.HOME_URL)}><HeartPulse /> NICE <span className="fw-lighter">POC</span></a>
          <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            {props.form}
          </div>
        </div>
      </nav>
      <div className="nav-scroller bg-body shadow-sm">
        <nav className="nav">
          <a className="nav-link active" title="Listes toutes les perturbations actuelles du système d'information" href={config.get('HOME_URL')}>Perturbations</a>
          <a className="nav-link text-danger" title="Appeler le support informatique" href="#" onClick={props.onHelpdeskClicked}><ExclamationTriangle color="#DC3545" width={18} height={18} /> Une urgence ?</a>
            <a className="nav-link" title="Vous assiste afin d'exprimer votre besoin de support de la meilleure manière" href={config.get('HOME_URL') + "/how-to"}><InfoCircle /> Assistant</a>
            <a className="nav-link ms-auto text-success fw-bold" href={config.get(Parameters.HOME_URL) + "/contribute"}><LightbulbFill /> J'améliore !</a>
            <a className="nav-link" href={config.get(Parameters.HOME_URL) + "/dashboard"}><Speedometer2 /> Notre performance</a>
            <a className="nav-link" href={config.get(Parameters.HOME_URL) + "/profile"}><Person /> Mon profil</a>
        </nav>
      </div>
    </>
  )
}

export { Head }