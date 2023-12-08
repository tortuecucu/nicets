import { useState, useMemo, useEffect } from "react";
import SETTINGS from "../../assets/data/StatusSettings";
import { SitesAffected } from "./OutageCommon";
import LOCATIONS from "../../assets/data/locations";
import { CheckLg, Dash, GearFill } from 'react-bootstrap-icons';
import { useApi } from "../../contexts/ApiProvider";

//NEXT: calculate last refresh and next news
const Header = ({ outage, children }) => {
    return (
        <>
            <div className="row header bg-body rounded-top shadow-sm mt-4 mb-0 p-3">
                <div className="d-flex">
                    <div className="">
                        <h3>{outage.service.name} - {outage.type.label}</h3>
                        <SitesAffected outage={outage} sites={LOCATIONS} compact={true} />
                        <p className="lead">{outage.shortDescription}</p>
                    </div>
                    <div className="ms-auto align-end">
                        <p className="updated text-right my-0">Actualisé il y a <span className="value">-- minutes</span></p>
                        <p className="mailing text-right my-0">Prochaine communication dans <span className="value">-- minutes</span></p>
                    </div>
                </div>
                {children}
            </div>


        </>
    );
};

const Tracker = ({ outage }) => {
    const [currentStatus, setCurrentStatus] = useState(null);

    useMemo(() => { //FIXME: enlever le state inutile
        setCurrentStatus(outage.statusId)
    }, [outage]);

    const items = [
        {
            label: 'Détection',
            statusId: 1,
            progress: 0,
            milestone: 'detected'
        },
        {
            label: 'Caractérisation',
            statusId: 2,
            progress: 25,
            milestone: ''
        },
        {
            label: 'Correction',
            statusId: 3,
            progress: 50,
            milestone: ''
        },
        {
            label: 'Vérification',
            statusId: 4,
            progress: 75,
            milestone: ''
        },
        {
            label: 'Finalisation',
            statusId: 6,
            progress: 100,
            milestone: ''
        }
    ];

    const renderItem = (item, index) => {
        return (<>
            <div key={item.progress} className={`step-desc step-${index + 1} position-absolute`}>
                <p className="my-0 name">{item.label}</p>
                <p className="my-0 occured">09:25</p>
            </div>
        </>)
    }

    const renderBadge = (item, index) => {
        var tag = 'done';
        var badge = <CheckLg />;

        if (item.statusId === currentStatus) {
            tag = 'active'
            badge = <GearFill className="rotate" />;
        } else if (item.statusId > currentStatus) {
            tag = '';
            badge = <Dash />;
        }

        return (
            <div key={item.progress} className={`step step-${index + 1} ${tag} position-absolute start-${item.progress} translate-middle rounded-pill`}>
                {badge}
            </div>
        )
    }

    const getProgress = () => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.statusId === currentStatus) {
                return `${item.progress}%`;
            }
        }
        return '0%';
    }

    return (
        <>
            <div className="mx-3 stepper bg-body my-3">
                <div className="inner position-relative ms-0 me-0">
                    <div className="progress" role="progressbar" style={{ height: '8px' }}>
                        <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{ width: getProgress() }}></div>
                    </div>
                    {items.map((item, index) => renderBadge(item, index))}
                </div>
                <div className="sub position-relative mt-3 mb-5">
                    {items.map((item, index) => renderItem(item, index))}
                </div>
            </div>
        </>
    );
};

const SubHeader = ({ outage }) => {
    const [labels, setLabels] = useState(null);
    const [settings, setSettings] = useState(null);
    const [details, setDetails] = useState(null);
    const api = useApi()

    useEffect(() => {
        if (outage) {
            api.getOutageDetails(outage.id)
                .then(data => {
                    const [err, resp] = data;
                    if (err) {
                        console.error(err)
                    } else {
                        setDetails(resp)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [outage])

    const getLabel = (detail) => {
        var label = getDetail(detail);
        try {
            if (!label) {
                if (detail === 'userAttitude') {
                    label = settings['userAttitude'];
                } else {
                    label = settings['actions'][String(detail).substring(7).toLowerCase()];
                }
            }
        } catch (e) {
            console.warn(e);
        } finally {
            return label;
        }
    }

    const getDetail = (name) => {
        try {
            if (details) {
                details.forEach(detail => {
                    if (detail.property === name) {
                        return detail.value;
                    }
                });
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    useMemo(() => {
        setSettings(SETTINGS[outage.statusId])
    }, [outage]);

    useMemo(() => {
        if (outage && settings && details) {
            setLabels(
                {
                    actionsDone: getLabel('actionsDone'),
                    actionsOngoing: getLabel('actionsOngoing'),
                    actionsNext: getLabel('actionsNext'),
                    userAttitude: getLabel('userAttitude'),
                }
            );
        }        
    }, [outage, settings, details]);

    return (<>
        {labels &&
            <div className="row mt-0 mb-0 p-0 border-top clearfix">
                <div className="action col col-4 bg-body  shadow-sm p-2">
                    <h6 className="text-center">Actions réalisées</h6>
                    <p className="text-justify p-2">{labels.actionsDone}</p>
                </div>
                <div className="action col col-4 bg-body border border-top-0 border-bottom-0 shadow-sm p-2">
                    <h6 className="text-center">Actions en cours</h6>
                    <p className="text-justify p-2">{labels.actionsOngoing}</p>
                </div>
                <div className="action col col-4 bg-body  shadow-sm p-2">
                    <h6 className="text-center">Actions suivantes</h6>
                    <p className="text-justify p-2">{labels.actionsNext}</p>
                </div>
            </div>
        }
        {(labels && labels.userAttitude) &&
            <div className="row">
                <div className="bg-warning-subtle shadow-sm rounded-bottom behaviour">
                    <p className="my-1">Les actions en cours peuvent rendre l'application instable. Attendez notre GO avant de l'utilisier à nouveau.</p>
                </div>
            </div>
        }
    </>)
}

export { SubHeader, Tracker, Header }