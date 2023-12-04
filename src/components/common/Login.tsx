import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useApi } from '../../contexts/ApiProvider';
import Cookies from 'js-cookie';
import { Toast } from 'primereact/toast';
import "./login.css"

const Login = ({ loggedCallback }) => {
    const api = useApi();
    console.log('api', useApi)
    const [email, setEmail] = useState();
    const form = useRef();
    const toast = useRef(null);

    const submitCallback = async () => {
        const [dirtyMail, dirtyCode] = [form.current.email.value, form.current.code.value]
        const cleanedMail = ((dirty) => {
            dirty = dirty.trim();
            const atIndex = dirty.indexOf('@');
            if (atIndex > -1) {
                dirty = String(dirty).substring(0, atIndex);
            }
            return dirty + '@safrangroup.com';
        })(dirtyMail);
        const cleanedCode = ((dirty) => {
            try {
                return Number(dirty);
            } catch (error) {
                return null;
            }
        })(dirtyCode);

        api.login(cleanedMail, cleanedCode)
            .then(result => {
                if (result) {
                    loggedCallback();
                } else {
                    toast.current.show({ severity: 'error', summary: 'Oops', detail: 'Vérifiez votre email et votre code d\'activation', life: 3000, position: 'top-center' });
                }
            })
            .catch(err => {
                console.error(err);
            })

    }

    const getEmail = async () => {
        const email = await Cookies.get('user_email');
        if (email) {
            const idx = email.indexOf('@');
            if (idx === -1) {
                return email;
            } else {
                return email.substring(0, idx);
            }
        }
        return null
    }

    useEffect(() => {
        async function checkData() {
            const data = await getEmail();
            setEmail(data);
        }
        checkData();

    }, []);

    return (
        <>
            <div className='login row my-3 shadow m-5'>
                <div className='col-4 rounded-start text-light py-4 px-4 welcome'>
                    <h2 className="mb-3 fw-normal mt-4 text-center mb-4">Bienvenue dans NICE !</h2>
                    <img className="img-fluid" src="src/assets/poc.png"></img>
                    <p className="lead mt-3 mt-4 text-center mt-4">Une gestion des incidents repensée, centrée sur vos besoins.</p>
                </div>
                <div className='col-8 rounded-end welcome py-4 px-4 '>
                    <div className='row details d-flex flew-row mx-2 mb-4'>
                        <div className=' p-3 content rounded-2 shadow-sm'>
                            <h4 className="text-success">Une Preuve de Concept (POC)</h4>
                            <p className="my-1">Ce prototype vous permet de tester au plus tôt ce service, d'exprimer votre satisfaction et de guider son évolution.</p>
                            <p className="my-1">A ce stade, l'application est donc incomplète, peut présenter des bugs et évolue constamment.</p>
                        </div>
                        <div className=' p-3 content rounded-2 shadow-sm ms-4'>
                            <h4 className="text-success">Comment participer ?</h4>
                            <p>Remontez-nous tout ce qui peut améliorer votre expérience: bugs, améliorations, nouvelles fonctionnalités, etc.</p>
                        </div>
                    </div>
                    <div className='row m-2 p-4 login rounded-2 shadow'>
                        <h3 className="text-success mb-4">Rejoignez-nous !</h3>
                        <form id="credentials" className="pb-3" ref={form}>
                            <div className="input-group input-group-lg mb-3">
                                <input id="email" type="email" className="form-control" placeholder="Votre email" value={email}></input>
                                <span className="input-group-text" id="basic-addon2">@safrangroup.com</span>
                            </div>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="code" placeholder="Code d'invitation"></input>
                                <label htmlFor="code">Code d'invitation</label>
                                <div id="codeHelp" className="form-text">Vous avez reçu ce code avec votre mail d'invitation</div>
                            </div>
                            <Button id="submit" onClick={submitCallback} className='btn-lg w-100 mt-5 py-2 btn-success mb-0'>Je participe à NICE !</Button>
                        </form>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </>
    );
};

export default Login;