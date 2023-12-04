import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "react-bootstrap";
import { Tag } from 'primereact/tag';
import { Trash } from "react-bootstrap-icons";
import { DataManager, ResponseContext } from "../../components/puller/DataPuller";
import { Alert } from "react-bootstrap";

const InputForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    const parse = (text) => {
        text = String(text).toLowerCase()
        const regex = /[a-z-]+.[a-z-]+\d?@safrangroup.com/g;
        const matches = [...text.matchAll(regex)];
        return [...new Set(matches.map(r => r[0]))]
    }

    const submitCallback = (data) => {
        const emails = parse(data.soup)
        if (Array.isArray(emails) && emails.length >= 1) {
            onSubmit(emails)
        }
    }

    return (<>
        <form onSubmit={handleSubmit(submitCallback)}>
            <div className="row">
                <h6>Emails des nouveaux utilisateurs</h6>
                <p className="text-secondary">Copiez ou saisissez les adresses @safrangroup.com des utilisateurs à ajouter</p>
                <InputFormView register={register} />
                <div className="hstack">
                    <Button className="mt-2 ms-auto" type="submit">Étape suivante</Button>
                </div>
            </div>
        </form>
    </>)
}

const InputFormView = ({ register }) => {
    return (<textarea className="form-control mx-2" rows="5" {...register("soup")}></textarea>)
}

const EditTable = ({ emails, onSubmit }) => {

    const [users, setUsers] = useState([
        ...emails.map(e => {
            const extract = (exp) => {
                try {
                    return e.match(exp)[1]
                } catch (e) {
                    console.error(e)
                }
            }

            return {
                firstname: extract(/^([a-z-]+)/),
                lastname: extract(/\.([a-z-]+)\d?@/),
                email: e,
                site: 'Colomiers'
            }
        })
    ])

    const deleteCallback = (user) => {
        setUsers([
            ...users.filter((u) => u.email !== user.email)
        ])
    }

    return (
        <EditTableView users={users} onSubmit={onSubmit} onDelete={deleteCallback} />
    )
}

const EditTableView = ({ users, onSubmit, onDelete }) => {
    const submitCallback = () => {
        onSubmit(users)
    }

    const cellEditor = (options) => {
        if (options.field === 'site') return siteEditor(options);
        return textEditor(options);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const siteEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={[
                    'Le Havre',
                    'Colomiers',
                    'Saclay'
                ]}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Site ?"
                itemTemplate={(option) => {
                    return <span>{option}</span>;
                }}
            />
        )
    }

    const deleteBody = (user) => {
        return <Button variant="outline-danger" size="sm" onClick={() => { onDelete(user) }}><Trash /></Button>
    }

    return (
        <>
            <div className="row">
                <h6>Utilisateurs à ajouter</h6>
                <p className="text-secondary">Double-cliquez sur un champ pour le modifier</p>
                <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="firstname" header="Prénom" editor={(options) => cellEditor(options)}></Column>
                    <Column field="lastname" header="Nom" editor={(options) => cellEditor(options)}></Column>
                    <Column field="email" header="Email" editor={(options) => cellEditor(options)}></Column>
                    <Column field="site" header="Site" editor={(options) => cellEditor(options)}></Column>
                    <Column header="Suppr." body={deleteBody}></Column>
                </DataTable>
                <div className="hstack">
                    <Button className="mt-2 ms-auto" onClick={submitCallback}>Étape suivante</Button>
                </div>
            </div>
        </>
    )
}

const ResultTable = ({ onRestart }) => {
    const {data} = useContext(ResponseContext)
    const clipboardCallback = () => {
        navigator.clipboard.writeText(JSON.stringify(data.map(r => {
            return {
                ...r,
                result: (r.created) ? 'success' : 'error',
            }
        })))
    }

    const resultBody = (result) => {
        return <Tag severity={result.created ? "success" : "danger"} value={result.created ? "Ajouté" : "Échec"}></Tag>
    }

    return (<>
        <DataTable resizableColumns value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column header="Résultat" body={resultBody}></Column>
            <Column field="email" header="Email"></Column>
            <Column field="code" header="Code"></Column>
        </DataTable>
        <div className="hstack">
            <Button className="ms-auto" variant="secondary" onClick={onRestart}>Ajouter d'autres utilisateurs</Button>
            <Button className="ms-2" onClick={clipboardCallback}>Copier dans le presse-papier</Button>
        </div>
    </>)
}



const ImportWizard = ({ handler }) => {
    const [step, setStep] = useState(1)
    const [emails, setEmails] = useState(null)
    const [users, setUsers] = useState([])

    const step1Callback = (mailingList) => {
        if (mailingList && Array.isArray(mailingList) && mailingList.length > 0) {
            setEmails(mailingList)
            setStep(2)
        }
    }

    const step2Callback = (users) => {
        setUsers(users)
        setStep(3)
    }

    const restartCallback = () => {
        setStep(1)
    }

    const onError = () => {
        return (<><Alert variant="danger">Une erreur est survenue, les comptes n'ont pas été créés <Alert.Link onClick={restartCallback}>Recommancer</Alert.Link></Alert></>)
    }

    const onFail = () => {
        return (<><Alert variant="warning">Vérifiez votre saisie, une incohérence empêche la création des comptes<Alert.Link onClick={restartCallback}>Recommancer</Alert.Link></Alert></>)
    }

    const toasts = {
        success: {
            title: 'Imporation achevée',
            message: 'Consultez la liste des résultats pour vérifiez les comptes créés'
        },
        error: {
            title: 'Importation annulée',
            message: 'une erreur est survenue lors de la création des comptes.'
        }
    }

    const handleUserCreation = async () => {
        return handler(users)
    }

    return (
        <>
            <div className="container bg-body-tertiarybg-body rounded shadow-sm p-2">
                {(step === 1) && <InputForm onSubmit={step1Callback} />}
                {(step === 2) && <EditTable emails={emails} onSubmit={step2Callback} />}
                {(step === 3) &&
                    <DataManager promise={handleUserCreation} errorElement={onError} fallback={onFail} toast={toasts}>
                        <ResultTable onRestart={restartCallback} />
                    </DataManager>
                }
            </div>
        </>
    )
}

export { ImportWizard }