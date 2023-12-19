import { useState } from "react";
import { useParams } from "react-router-dom";
import ContextForm from "./context/Context.jsx"
import { OutageSummary } from "src/components/outage/OutageSummary.jsx";
import { DoorClosed } from "react-bootstrap-icons";
import { useSanitizer } from "src/hooks/custom/useSanitizer.js";
import { OutageFetcher } from "src/components/outage/OutageFetcher.js";
import { StateCaptions, Verb } from "src/types/userstate.js";
import { useUserState } from "src/hooks/backend/userstate/useUserState.js";
import { useResponseContext } from "src/components/puller/DataPuller.js";
import { OutageType } from "src/types/outagetype.js";
import { ResponseChooser } from "./ResponseChooser.js";

type StateInnerProps = {
  verb: Verb,
  value: string
}

const StateInner = (props: StateInnerProps) => {
  const { data: outage } = useResponseContext<OutageType>()
  const { captions } = useUserState()



  const handleResponse = async (choiceName) => {

  }
  //TODO: complete logic
  return (
    <>
      <div className="row">
        <div className="col col-4">
          <OutageSummary outage={outage} fullHeight={true} />
        </div>
        <div className="col col-8">
          <ResponseChooser captions={captions(props.verb) as StateCaptions} onSelected={handleResponse} />
        </div>
      </div>
    </>
  );
};

function OutageClosed() {
  return (
    <>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <DoorClosed color="rgb(173 176 179)" height={250} width={250} />
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

const State = () => {
  const { verb: dirtyVerb, outageid, value } = useParams();
  const { sanitize } = useStringSanitizer()
  const { getVerb } = useUserState()

  let id = 0
  if (outageid) {
    id = +outageid
  }

  const cleanedValue = sanitize(value || '', ['yes', 'no'], 'yes');

  return (
    <OutageFetcher id={id}>
      <StateInner verb={getVerb(dirtyVerb || '') || Verb.Undefined} value={cleanedValue} />
    </OutageFetcher>
  )
}

export default State;