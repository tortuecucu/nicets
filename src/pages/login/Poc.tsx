import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Toast } from 'primereact/toast';
import { useAuth } from '../../hooks/backend/useAuth';
import { useForm } from 'react-hook-form';
import { ReactNode } from 'react'

import "./poc.css"

interface FormData {
    email?: string,
    code?: string
}

const Poc = () => {
    const toast = useRef(null);
    const { logIn } = useAuth()

    const handleSubmit = (email: string, code: number): void => {
        logIn(email, code)
    }

    return (
        <>
            <LoginDumb>
                <LoginForm onSubmit={handleSubmit} />
            </LoginDumb>
            <Toast ref={toast} />
        </>
    );
};

type FormProps = {
    onSubmit: (email: string, code: number) => void
}

const LoginForm = (props: FormProps) => {
    const getCachedEmail = async () => {
        const email = await Cookies.get('user_email');
        if (email) {
            const idx = email.indexOf('@');
            if (idx === -1) {
                return email;
            } else {
                return email.substring(0, idx);
            }
        }
        return undefined
    }

    const getDefaults = async (): Promise<FormData> => {
        return {
            email: await getCachedEmail(),
            code: undefined
        }
    }

    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: async () => getDefaults()
    });

    const submitCallback = async(data: FormData) => {
        const [dirtyMail, dirtyCode] = [data.email, data.code]
        const cleanedMail: string | undefined = ((dirty) => {
            if (dirty) {
                const atIndex = dirty.indexOf('@');
                if (atIndex > -1) {
                    dirty = dirty.trim();
                    dirty = String(dirty).substring(0, atIndex);
                }
                return dirty + '@safrangroup.com';
            }
            return undefined
        })(dirtyMail);
        const cleanedCode: number | undefined = ((dirty) => {
            try {
                return Number(dirty);
            } catch (error) {
                return undefined;
            }
        })(dirtyCode);

        if (cleanedMail && cleanedCode) {
            props.onSubmit(cleanedMail, cleanedCode)
        }
    }

    return (<>
        <form id="credentials" className="pb-3" onSubmit={handleSubmit(async (data) => await submitCallback(data))}>
            <div className="input-group input-group-lg mb-3">
                <input id="email" type="text" className="form-control" placeholder="Votre email" {...register("email")}></input>
                <span className="input-group-text" id="basic-addon2">@safrangroup.com</span>
            </div>
            <div className="form-floating">
                <input type="number" className="form-control" id="code" placeholder="Code d'invitation" {...register("code")}></input>
                <label htmlFor="code">Code d'invitation</label>
                <div id="codeHelp" className="form-text">Vous avez reçu ce code avec votre mail d'invitation</div>
            </div>
            <Button type="submit" className='btn-lg w-100 mt-5 py-2 btn-success mb-0'>Je participe à NICE !</Button>
        </form>
    </>)
}

type DumbProps = {
    children: ReactNode
}

const LoginDumb = (props: DumbProps) => {
    return (
        <>
            <div className='login row my-3 shadow m-5'>
                <div className='col-4 rounded-start text-light py-4 px-4 welcome'>
                    <h2 className="mb-3 fw-normal mt-4 text-center mb-4">Bienvenue dans NICE !</h2>
                    <img className="img-fluid" src="s/imgs/poc.png"></img>
                    <p className="lead mt-3 mt-4 text-center mt-4">Une gestion des incidents repensée, centrée sur vos besoins.</p>
                </div>
                <div className='col-8 rounded-end welcome py-4 px-4 '>
                    <div className='row details d-flex flew-row mx-2 mb-4'>
                        <div className=' p-3 content rounded-2 shadow-sm'>
                            <h4 className="text-success">Une Preuve de Concept (POC)</h4>
                            <p className="my-1">Ce prototype vous permet de tester au plus tôt ce service, d'exprimer votre satisfaction et de guider son évolution.</p>
                        </div>
                        <div className=' p-3 content rounded-2 shadow-sm ms-4'>
                            <h4 className="text-success">Comment participer ?</h4>
                            <p>Remontez-nous tout ce qui peut améliorer votre expérience: bugs, améliorations, nouvelles fonctionnalités, etc.</p>
                        </div>
                    </div>
                    <div className='row m-2 p-4 login rounded-2 shadow'>
                        <h3 className="text-success mb-4">Rejoignez-nous !</h3>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Poc;