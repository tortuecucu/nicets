import React, { useState, useEffect, useMemo} from 'react';
import { useApi } from '../contexts/ApiProvider';
import {ServicePanel} from '../components/userServices/Panel';
import Cookies from 'js-cookie';


const UserProfile = () => {
    return (
        <>
            <div className="container p-3 bg-body rounded shadow-sm mt-5">
                <h1 className="">Vos préférérences</h1>
                <p className="lead mb-5">Complétez la liste de vos applications pour adapter le portail à vos besoins et recevoir des communications adaptées</p>
                <div className="row">
                    <div className="col-4 border-end pe-4">
                        <div className="mb-5 rounded shadow-sm bg-info-subtle p-3 text-primary-emphasis bg-opacity-75">
                            <h5 className='text-primary-emphasis'>Comment compléter votre profil ?</h5>
                            <ol>
                                <li className='pt-2'>
                                    <span className='fw-semibold'>Ajoutez des applications</span>
                                    <br></br>
                                    <span className='fw-light text-info-emphasis'>Listez les applications que vous utilisez le plus dans vos missions</span>
                                </li>
                                <li className='pt-2'>
                                    <span className='fw-semibold'>Classez vos applications</span>
                                    <br></br>
                                    <span className='fw-light text-info-emphasis'>Montez les applications que vous utilisez le plus en tête de liste</span>
                                </li>
                                <li className='pt-2'>
                                    <span className='fw-semibold'>Sélectionnez vos notifications</span>
                                    <br></br>
                                    <span className='fw-light text-info-emphasis'>Choisissez les applications pour lesquelles vous souhaitez être informé en cas de dysfonctionnement</span>
                                </li>
                            </ol>
                        </div>
                        <div className="row">
                            <UserPanel />
                            <Logout />
                        </div>
                    </div>
                    <div className="col-8 ps-4">
                        <ServicePanel />
                    </div>
                </div>
            </div>
        </>
    );
};

const UserPanel = () => {
    const api = useApi();
    const [data, setData] = useState(null);
    const [infos, setInfos] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const [data, err] = await api.getProfile();
            if (err) {
                console.error(err);
            } else {
                setData(data);
            }
        }
        fetchData();
    }, [])

    useMemo(() => {
        if (data) {
            const getProperties = (obj, props) => {
                return props.map(prop => {
                    const [key, display] = (Array.isArray(prop)) ? [prop[0], prop[1]] : [prop, prop]
                    return {
                        key: display,
                        value: obj[key]
                    }
                })
            }

            setInfos([
                ...getProperties(data, ['email', 'firstname', 'lastname']),
                ...getProperties(data.company, [['name', 'company']]),
                ...getProperties(data.site, [['name', 'site']])
            ]);
        }
    }, [data])

    return (<>
        <h3 className="mb-3 fw-normal">Votre profil</h3>
        {infos && <UserInfosList infos={infos} />}
    </>)

};

const UserInfosList = ({ infos }) => {
    const translator = (text) => {
        const TRANSLATIONS = {
            firstname: 'prénom',
            lastname: 'nom',
            company: 'société'
        }
        const tranlation = TRANSLATIONS[text]
        return (tranlation) ? tranlation : text
    }
    return (
        <ul className="list-group p-2">
            {infos.map(info => {
                return <li key={info.key} className="list-group-item"><span className="text-secondary fw-light">{translator(info.key)} </span>{info.value}</li>
            })}

        </ul>
    )
}

const Logout = () => {
    const logoutCallBack = () => {
        Cookies.remove('rat');
        Cookies.remove('nat');
        window.location.reload(true)
    }
    return(<>
        <button onClick={logoutCallBack} className='btn btn-warning'>Se Déconnecter</button>
    </>)
}

export default UserProfile;
