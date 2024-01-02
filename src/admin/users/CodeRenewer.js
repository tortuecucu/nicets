import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { LinkMail } from "../../components/utils/LinkMail";
import { ClipboardButton } from "../../components/utils/ClipboardButton";
import { UserContext } from "./UserContext";
import { DataManager, ResponseContext, useResponseContext } from "../../components/puller/DataPuller";

const CodeRenewer = ({ onRenew }) => {
    const { user, resetUser } = useContext(UserContext)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleConfirmation = () => {
        setIsConfirmed(true)
    }

    const handleRenewal = async () => {
        return await onRenew(user.id)
    }
    
    return (<>
        {!isConfirmed ? <ConfirmPanel user={user} handleRenew={handleConfirmation} resetUser={resetUser} /> : <ProcessingPanel promise={handleRenewal} user={user} resetUser={resetUser} />}
    </>)
}

const ConfirmPanel = ({ user, handleRenew, resetUser }) => {
    return (<>
        <p className="mt-5">Renouveler le code de {user.firstname} {user.lastname} ?</p>
        <div className="hstack">
            <Button variant="success" onClick={handleRenew}>Changer de code</Button>
            <Button variant="secondary" className="ms-2" onClick={resetUser}>Changer d'utilisateur</Button>
        </div>
    </>)
}

const ProcessingPanel = ({user, resetUser, promise}) => {
    return(<>
        <DataManager promise={promise}>
            <ResultPanel user={user} resetUser={resetUser}/>
        </DataManager>
    </>)
}

const ResultPanel = ({ user, resetUser}) => {
    const {data} = useResponseContext()

    console.log('data', data)

    const bodyComposer = () => {
        return (`Bonjour, 
        Votre nouveau code d'invitation est '${data}'.`)
    }

    return (<>
        <p className="lead my-4"><span className="fw-bold">{data}</span> est le nouveau code de {user.firstname} {user.lastname}</p>
        <div className="hstack">
            <LinkMail email={user.email} subject="Portail NICE - Votre nouveau code d'invitation" body={bodyComposer()}>Envoyer le code</LinkMail>
            <ClipboardButton dataFunc={() => { return data }} className="ms-2">Copier le code</ClipboardButton>
            <Button variant="secondary" className="ms-2" onClick={resetUser}>Changer d'utilisateur</Button>
        </div>
    </>)
}

export { CodeRenewer }