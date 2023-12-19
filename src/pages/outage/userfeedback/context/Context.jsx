import { useState, useRef, useContext } from "react"
import {UnfinishedFeature} from "../../../../components/utils/Alerts"
import { useApi } from "../../../../contexts/ApiProvider"
import { ToastContext } from "../../../Layout"

function OnSite() {
    return (
        <>
            <h6>Vous vous trouvez sur un site Safran</h6>
            <div className="mx-4">
                <label htmlFor="site" className="form-label">Site</label>
                <select id="site" className="form-control" required>
                    <option selected>Sur quel site vous trouvez-vous ?</option>
                    <option value="sna.bly">Burnley</option>
                    <option value="sna.cas">Casablanca</option>
                    <option value="sna.clm">Colomiers</option>
                    <option value="sna.flo">Florange</option>
                    <option value="sna.hbg">Hambourg</option>
                    <option value="sna.leh">Le Havre</option>
                    <option value="sna.mob">Mobile</option>
                    <option value="sna.pon">Pont-Audemer</option>
                    <option value="sna.cmh">Saclay</option>
                    <option value="saf">Un autre site Safran</option>
                </select>
                <div className="mt-2">
                    <label htmlFor="hostname" className="form-label">Localisation</label>
                    <input type="text" className="form-control" id="area" placeholder="batiment 3, etage 2, bureau 69"></input>
                    <div id="hostnameHelp" className="form-text">Cette information nous est utile pour identifier des problèmes liés à la localisation</div>
                </div>
            </div>
        </>
    )
}

function OnVpn() {
    return (
        <>
            <h6>Vous vous trouvez en mobilité</h6>
            <div className="container">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="vpnConnected"></input>
                    <label className="form-check-label" htmlFor="vpnConnected">Ma connection myMobility est active</label>
                </div>
            </div>
        </>
    )
}

function OnVdi() {
    return (
        <>
            <h6>Vous utilisez un bureau virtuel VDI</h6>
            <div className="container">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="vdiConnected"></input>
                    <label className="form-check-label" htmlFor="vdiConnected">J'ai saisi mon code d'activation</label>
                </div>
            </div>
        </>
    )
}

function Network() {
    const [showWifi, setShowWifi] = useState(false);
    function useLan() {
        setShowWifi(false);
    }
    function useWifi() {
        setShowWifi(true);
    }

    let wifi = <>
        <h6 className="mb-2 mt-4">Votre connexion Wi-Fi</h6>
        <div className="mx-4">
            <select id="ssid" className="form-control" required>
                <option selected>Quel réseau wifi utilisez-vous ?</option>
                <option value="sna.bly">Utilisateurs</option>
                <option value="sna.cas">Safran Groupe</option>
                <option value="sna.clm">Safran Guest</option>
                <option value="sna.flo">Autre réseau</option>
            </select>
        </div>
    </>;

    return (
        <>
            <div className="p-2 shadow-sm rounded bg-body-tertiary my-4">
                <h4 className="my-2">Votre connexion réseau</h4>
                <div className="ms-4 my-2">
                    <h6 className="mb-2">Quelle type de connexion utilisez-vous ?</h6>
                    <div className="row mx-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="connection" id="conLan" value="lan" onChange={useLan} autocomplete="off"></input>
                            <label className="form-check-label" htmlFor="conLan">J'utilise une connection <strong>filaire</strong></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="connection" id="conWifi" value="wifi" onChange={useWifi} autocomplete="off" ></input>
                            <label className="form-check-label" htmlFor="conWifi">J'utilise une connexion  <strong>Wi-Fi</strong></label>
                        </div>
                    </div>
                    {showWifi && wifi}
                    <h6 className="mb-2 mt-4">Cochez les actions qui fonctionnent sur votre poste:</h6>
                    <div className="mx-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="ckExecutable"></input>
                            <label className="form-check-label" htmlFor="ckExecutable">Je peux utiliser une application sur mon poste, comme Word ou Excel</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="ckInternal"></input>
                            <label className="form-check-label" htmlFor="ckInternal">Je peux utiliser un portail Safran, comme <a href="https://insite.collab.group.safran/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Insite</a> ou <a href="https://gta6.safran-nacelles.com/" target="_blank" rel="noopener noreferrer">GTA Horoquartz</a></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="ckExternal"></input>
                            <label className="form-check-label" htmlFor="ckExternal">Je peux utiliser un site web public, comme <a href="https://www.lemonde.fr/" target="_blank" rel="noopener noreferrer">lemonde.fr</a> ou <a href="https://www.google.fr/" target="_blank" rel="noopener noreferrer">google.fr</a></label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Computer() {
    const [activate, setActivate] = useState(false);
    function handleChange() {
        setActivate(!activate);
    }
    return (
        <>
            <div className="p-2 shadow-sm rounded bg-body-tertiary my-4">
                <h4 className="my-2">Votre ordinateur</h4>
                <div className="m-4">
                    <div className="me-2">
                        <label htmlFor="hostname" className="form-label">Identifiant de votre ordinateur</label>
                        <input type="text" className="form-control" id="computer" placeholder="SNA-IL001234" required></input>
                        <div id="hostnameHelp" className="form-text">La référence du poste est inscrite sur une étiquette blanche collée sur votre ordinateur</div>
                    </div>
                    <div className="mt-2 mx-4">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="computerRestarted" onChange={handleChange} ></input>
                            <label className="form-check-label" htmlFor="computerRestarted">J'ai redémarré mon ordinateur</label>
                        </div>
                        <div className="form-check form-switch mx-4">
                            <input className="form-check-input" type="checkbox" role="switch" id="computerRestartOk" disabled={!activate} ></input>
                            <label className="form-check-label" htmlFor="computerRestartOk">Le redémarrage a corrigé la panne</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Location() {
    const [location, setLocation] = useState(0);

    function handleLocation(e) {
        switch (e.target.value) {
            case "site":
                setLocation(1);
                break;
            case "vpn":
                setLocation(2);
                break;
            default:
                setLocation(3);
        }
    }

    return (
        <>
            <div className="p-2 shadow-sm rounded bg-body-tertiary my-4">
                <h4 className="mb-4">Votre localisation</h4>
                <div className="ms-4 mb-2">
                    <h6 className="mb-2">Où vous trouvez-vous actuellement ?</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="location" id="locOnsite" value="site" onChange={handleLocation} autocomplete="off"></input>
                        <label className="form-check-label" htmlFor="locOnsite">Je suis sur un site Safran</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="location" id="locVpn" value="vpn" onChange={handleLocation}></input>
                        <label className="form-check-label" htmlFor="locVpn">Je suis en mobilité</label>
                    </div>
                    <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" name="location" id="locVdi" value="vdi" onChange={handleLocation}></input>
                        <label className="form-check-label" htmlFor="locVdi">J'utilise un bureau virtuel VDI</label>
                    </div>
                    {location === 1 && <OnSite/>}
                    {location === 2 && <OnVpn/>}
                    {location === 3 && <OnVdi/>}
                </div>
            </div>
        </>
    )
}

/**
 * Renders a form component for providing context information about an outage.
 * @param {Object} props - The component props.
 * @param {Object} props.outage - The outage object.
 * @returns {JSX.Element} - The rendered form component.
 */
function ContextForm({ outage }) {
    // ... rest of the code
}
function ContextForm({ outage }) {
    const form = useRef();
    const api = useApi();
    const {showToast} = useContext(ToastContext);

    const payload = (elements) => {
        return elements
        .filter((el) => el.id)
        .map(el => {
            var value = null;
            switch (el.type) {
                case 'checkbox':
                case 'radio':
                    value = el.checked; 
                    break;               
                default:
                    value = el.value;
                    break;
            }
            return {
                id: el.id,
                value: value
            }
        })
    }

    async function handleSubmit(e) {
        const [resp, err] = await api.postContext(
            outage.id,
            payload([...form.current])
            )
        if (err) {
            console.error(err);
            showToast({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'enregistrement', life: 3000 });
        } else if (resp) {
            showToast({ severity: 'success', summary: 'Merci', detail: 'Vos infos sont prises en compte, merci pour vos efforts!', life: 3000 });
        } else {
            showToast({ severity: 'warning', summary: 'Non enregistré', detail: 'Erreur lors de l\'enregistrement', life: 3000 });
        }
    }
    return (
        <>
            <div className="my-3 p-4 bg-body rounded shadow-sm">
                <UnfinishedFeature />
                <form id="context" ref={form}>
                    <h3 className="mb-1">Quelle est votre situation ?</h3>
                    <p className="lead mb-4">Ces informations nous permettront de déterminer la cause de la panne plus rapidement.</p>
                    <Location  />
                    <Computer  />
                    <Network  />
                    <div className="mt-4 hstack m-4">
                        <button type="button" className="btn btn-lg btn-primary ms-auto" onClick={handleSubmit}>Envoyer</button>
                    </div>
                </form >
            </div>
        </>
    )
}

export default ContextForm;