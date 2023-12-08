import { useNavigate } from "react-router-dom"

const TipsPanel = () => {
    const navigate = useNavigate()

    const handleAssistant = () => {
        navigate('/how-to')
    }

    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h5 className="pb-2 mb-4">Besoin du support informatique ?</h5>
                <div className="d-flex flex-row">
                    <div className="image">
                        <img src="s/imgs/wizard.png" width="150"></img>
                    </div>
                    <div className="ms-2">
                        <p className="lead fs-5">Formuler votre besoin efficacement est la clé pour obtenir le bon support au bon moment.</p>
                        <p className="lead fs-6">Utilisez notre assistant pour faire bon du premier coup.</p>
                        <a onClick={handleAssistant} className="btn btn-primary w-100 mb-4">J'utilise l'assistant</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export {TipsPanel}