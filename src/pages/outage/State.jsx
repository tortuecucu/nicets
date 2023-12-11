import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useApi } from '../../contexts/ApiProvider.jsx';
import ContextForm from "./Context.js"
import { OutageSummary } from '../../components/home/outages/OutagePanels.jsx';
import { PageLoader } from "../../components/utils/PulseLoader.js";
import { useMemo } from "react";
import { DoorClosed } from "react-bootstrap-icons";
import { ToastContext } from "../Layout.js";
import { useContext } from "react";
import { OutageNotFound } from "../../components/utils/BigMessages.jsx";


const STATES = [
  {
    name: 'affected',
    id: 1,
    title: "Rencontrez-vous ce dysfonctionnement ?",
    choices: [
      {
        name: 'yes',
        title: 'Oui, je constate la panne',
        text: 'La panne est présente sur mon poste, comme elle est décrite dans l\'incident',
        button: {
          label: 'Je suis affecté(e)',
          color: 'btn-danger',
        }
      },
      {
        name: 'no',
        title: 'Non, je ne suis pas affecté(e)',
        text: 'L\'application fonctionne normalement sur mon poste',
        button: {
          label: 'Tout est normal',
          color: 'btn-success',
        }
      },
      {
        name: 'undecided',
        title: 'Je ne sais pas',
        text: 'Le comportement ne me semble pas normal mais ne correspond pas à celui décrit dans l\'incident',
        button: {
          label: 'Je ne sais pas',
          color: 'btn-light',
        }
      }
    ]
  },
  {
    name: 'workaround',
    id: 2,
    title: "Le contournement fonctionne-t-il sur votre poste ?",
    choices: [
      {
        name: 'yes',
        title: 'Le contournement fonctionne',
        text: 'J\'ai appliqué le contournement et il fonctionne comme attendu',
        button: {
          label: 'Contournement OK',
          color: 'btn-success',
        }
      },
      {
        name: 'no',
        title: 'Non, la situation est inchangée',
        text: 'J\'ai appliqué le contournement mais le résultat attendu ne s\'est pas produit',
        button: {
          label: 'Contournement en échec',
          color: 'btn-danger',
        }
      },
      {
        name: 'undecided',
        title: 'Je ne sais pas',
        text: 'Le comportement a changé mais ne correspond pas à l\'attendu',
        button: {
          label: 'Je ne sais pas',
          color: 'btn-light',
        }
      }
    ]
  },
  {
    name: 'nominal',
    id: 3,
    title: "L'application est-elle revenue à la normale ?",
    choices: [
      {
        name: 'yes',
        title: 'Oui, tout est en ordre',
        text: 'Je peux utiliser l\'application comme avant la panne',
        button: {
          label: 'Fonctionnement normal',
          color: 'btn-success',
        }
      },
      {
        name: 'no',
        title: 'Non, la situation est inchangée',
        text: 'Je constate toujours la panne sur mon poste',
        button: {
          label: 'Dysfonctionnement actif',
          color: 'btn-danger',
        }
      },
      {
        name: 'undecided',
        title: 'Je ne sais pas',
        text: 'Le comportement a changé mais n\'est toujours pas revenu à la normale',
        button: {
          label: 'Je ne sais pas',
          color: 'btn-light',
        }
      }
    ]
  }
];

const StateInner = ({ outage, verb, value }) => {
  const [showContext, setShowContext] = useState(false);
  const api = useApi();
  const {showToast} = useContext(ToastContext);

  const state = useMemo(() => {
    //retieves state id
    const item = STATES.find(s => s.name === verb)
    var id = null;
    if (item) {
      id=item;
    } else {
      id=STATES[0];
    }
    //ensure state is compliant with outage status
    if (outage && id===1 && outage.statusId === 4) {
      id= 2
    } else if (outage.statusId === 5) {
      id=3
    } else if (outage && id===2 && outage.statusId < 4) {
      id=1
    } 

    return id
  }, [verb])

  const handleResponse = async (choiceName) => {
      const [response, err] = await api.postState(outage.id, state.name, choiceName);
      if (err) {
        console.error(err);
        showToast({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'enregistrer votre réponse', life: 3000 });
      } else if (response) {
        setShowContext(true);
        showToast({ severity: 'success', summary: 'Merci', detail: 'Votre bonne action compte !', life: 3000 });
      } else {
        showToast({ severity: 'error', summary: 'Oops', detail: 'Impossible d\'enregistrer votre réponse', life: 3000 });
      }

  }

  return (
    <>
      <div className="row">
        <div className="col col-4">
          {outage != null && <OutageSummary outage={outage} fullHeight={true} />}
        </div>
        <div className="col col-8">
            {!showContext && <ResponseChooser state={state} onSelected={handleResponse} />}
            {showContext && <ContextForm outage={outage} />}
        </div>
      </div>

    </>
  );
};

function ResponseChooser({ state, onSelected }) {
  function handleClick(e) {
    onSelected(e.target.name);
  }

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h3 className="mb-4 fs-4">{state.title}</h3>
        <div>
          <ul className="list-group list-group-horizontal mb-4">
            {state.choices.map(r =>
              <li key={r.name} className="list-group-item col-4">
                <div className="d-flex flex-column mb-3 h-100">
                  <h5 className="card-title">{r.title}</h5>
                  <p className="card-text mt-auto">{r.text}</p>
                  <button name={r.name} className={'btn btn-success mt-3 ' + r.button.color} onClick={handleClick}>{r.button.label}</button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

function OutageClosed({ outage }) {
  return (
    <>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <DoorClosed color="rgb(173 176 179)"  height={250} width={250} />
          <h1 className="text-body-emphasis">Votre tour est passé !</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">Cet incident est clos. Il n'est plus possible de participer.</p>
          <div className="d-inline-flex gap-2 mb-5">
            <a href="/" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">Retour à l'accueil</a>
          </div>
        </div>
      </div>
    </>
  )
}



/**
 * handle data fecthing and loading operations
 * @returns 
 */
const State = () => {
  const [outage, setOutage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { verb, outageid, value } = useParams();
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const [response, err] = await api.getOutageByID(outageid);
      if (err) {
        console.error(err);
      } else if(typeof response === 'object' ) {
        setOutage(response);
      }
      setLoaded(true);
    }
    fetchData();
  }, [outageid])

  const isClosed = useMemo(() => {
    if (outage) {
      return false //TODO: code it
    } else {
      return false
    }
  }, [outage])

  const cleanedValue = 'yes' / useMemo(() => {
    return api.sanitizeString(value, ['yes', 'no'], null);
  }, [value])

  return (<>
    {(outage === null && loaded === false) && <PageLoader />}
    {(outage === null && loaded === true) && <OutageNotFound />}
    {(outage && !isClosed) && <StateInner outage={outage} verb={verb} value={cleanedValue} />}
    {(outage && isClosed) && <OutageClosed />}
  </>)
}



export default State;