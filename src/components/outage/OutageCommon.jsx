import Tornado from "../data/Tornado";
import tornadoData from '../../data/tornado.json';
import { useState, useMemo } from "react";
import SETTINGS from "../../data/StatusSettings";
import LOCATIONS from "../../data/locations";

const AffectedPanel = ({ outage }) => {

    return (
        <div className="my-3 p-4 bg-body rounded shadow-sm">
            <div className="hstack mb-4">
                <h4 className="">Impact déclaré par les utilisateurs</h4>
                <span className="badge text-bg-danger ms-auto">120 utilisateurs affectés</span>
            </div>
            <h6 className="mt-4">Description du dysfonctionnement</h6>
            <p className="lead mb-2 fs-5 ms-3">{outage.description}</p>
            <h6 className="mt-4 mb-3">Sites affectés</h6>
            <SitesAffected outage={outage} sites={LOCATIONS} />
            <h6 className="mt-4 mb-3">Retours des utilisateurs</h6>
            <Tornado data={tornadoData} title={""} value="count" dimensions={['result', 'site', 'connection']} leftValue="yes" />
            <hr className="hr" />
            <div className="hstack">
                <ActionPanel outage={outage} compact={true} className={'ms-auto'} />
            </div>
        </div>
    )
};

const SitesAffected = ({ outage, sites, compact = false }) => {
    const getVariant = (siteLabel) => {
        var variant = 'light';

        if (outage.locations) {
            outage.locations.forEach(loc => {
                if (loc.name === siteLabel) {
                    if (loc.outagelocation.relationId === 2) {
                        variant = 'danger';
                    } else if (loc.outagelocation.relationId === 3) {
                        variant = 'success';
                    } else {
                        variant = 'light';
                    }
                }
            });
        }

        return variant;
    }
    return (<>
        <div className="sites">
            {sites.map(site => {
                const variant = getVariant(site.label)
                if (compact && variant === 'danger') {
                    return <span key={site.accronym} className={`badge rounded-pill text-bg-${variant} me-1`}>{site.accronym}</span>
                } else if (!compact) {
                    return <span key={site.accronym} className={`badge rounded-pill text-bg-${variant} me-1`}>{site.label}</span>
                } else {
                    return null;
                }
            })}
        </div>
    </>)
}

const ImpactPanel = ({ outage }) => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="mb-4">Impact déclaré par le management</h5>
            <h6 className="mb-1">Impacts clients</h6>
            <div className=" rounded m-2 p-2 bg-danger-subtle shadow-sm">
                <div className="hstack text-danger-emphasis">
                    <strong className="client">Rolls-Royce Gmbh</strong>
                    <small className="direction ms-auto">Direction Technique</small>
                </div>
                <p className="m-0 fw-light">Livraison des essais feu TLR-6 au 15/08/2023</p>
            </div>

            <h6 className="mt-4 mb-1">Impacts opérationnels</h6>
            <p className="text-muted p-1">Aucun impact opérationnel n'a encore été déclaré.<br></br>Faites le dès maintenant !</p>
            <hr className="hr" />
            <div className="hstack">
                <a href={'/impact/'+outage.id} className="btn btn-outline-secondary btn-sm ms-auto">Demander une escalation</a>
                <a href={'/impact/'+outage.id}   className="btn btn-outline-primary btn-sm ms-2">Je complète les impacts</a>
            </div>
        </div>
    )
}

const ActionPanel = ({ outage, compact = false, className }) => {
    const [settings, setSettings] = useState(null);

    useMemo(() => {
        setSettings(SETTINGS[outage.statusId])
    }, [outage]);


    return (<>
        {(settings && !compact) &&
            <div className="cta my-3 p-3 bg-body rounded shadow-sm ">
                <p className="title my-0">Rejoignez les 154 utilisateurs qui nous aident !</p>
                <p className="explanation fw-light">{settings.reason}</p>
                <ActionButtons choices={settings.feedback.choices} outage={outage}/>
            </div>
        }
        {(settings && compact) &&
            <div className={`hstack ${className}`}>
                <ActionButtons choices={settings.feedback.choices} outage={outage} />
            </div>
        }
    </>);
}

const ActionButtons = ({ choices, outage }) => {
    
    const link = (template) => {
        if (outage) {
            return String(template).replace('$id', outage.id)
        } else {
            return template
        }
    }

    return (<>
        {choices && choices.map(choice =>
            <a href={link(choice.href)} className={`btn me-3 btn-${choice.variant}`}>{choice.label}</a>
        )}
    </>)
}

export { AffectedPanel, ImpactPanel, ActionPanel, SitesAffected };