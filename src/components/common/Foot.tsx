import { useConfig, Parameters } from "src/hooks/config/useConfig"
import { useNavigate } from "react-router-dom"

function Foot() {
    const config = useConfig()
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    return (
        <>
            <div className="container">
                <footer>
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a onClick={handleHome} className="nav-link px-2 text-body-secondary">Accueil</a></li>
                        <li className="nav-item"><a href={config.get(Parameters.SNOW_URL)} className="nav-link px-2 text-body-secondary" target="_blank" rel="noreferrer">ServiceNow</a></li>
                        <li className="nav-item"><a href="https://safran.service-now.com/safrangroup?id=btic_my_cases" className="nav-link px-2 text-body-secondary" target="_blank" rel="noreferrer">Mes demandes</a></li>
                    </ul>
                    <p className="text-center text-body-secondary fs-6">© 2023 Safran Nacelles</p>
                </footer>
            </div>
        </>
    )
}

export { Foot }