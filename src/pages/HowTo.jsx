import { useState, createContext, useContext } from "react";
import { Button } from "react-bootstrap";
import { ArrowRightSquareFill } from "react-bootstrap-icons";

import "./howto.css"
import data from '../assets/data/howto.json';

const PanelContext = createContext();
const Wizard = ({ children }) => {
    const [active, _setActive] = useState(1);
    const [history, setHistory] = useState([]);

    const setActive = (active) => {
        _setActive(active);
        if (history.length === 0 || history[history.length - 1] !== active) {
            setHistory([...history, active]);
        }
    }

    function goBack() {
        if (history.length >= 1) {
            const copy = [...history];

            if (copy[copy.length - 1] === active) {
                copy.pop();
            }
            setHistory([...copy]);

            if (copy.length >= 1) {
                _setActive(copy.pop());
            } else {
                _setActive(1);
            }
        }
    }

    return (
        <>
            <PanelContext.Provider value={{ active, setActive, goBack, history }}>
                {children}
            </PanelContext.Provider>
        </>
    )
}

const HowTo = () => {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm m-5">
                <h3 className="mb-3 fw-normal">Besoin d'aide du support informatique ?</h3>
                <p className="lead">Demande, Changement, Incident... Formuler votre besoin de la bonne manière est clé pour obtenir le bon support<br></br>Utilisez cet assistant et laissez-vous guider !</p>
                <div className="container">
                    <WizardFactory data={data} />
                </div>
            </div>
        </>
    );
};

const Panel = ({ id, title, subtitle, children }) => {
    const { active, goBack, history } = useContext(PanelContext);

    if (id === active) {
        return <>
            <div className="p-3">
                <h4 className="pb-4">{title}</h4>
                {history.length >= 1 && <Button className="my-2" onClick={goBack}>retour</Button>}
                <ul className="list-group">
                    {children}
                </ul>
            </div></>
    } else {
        return
    }

};

const Response = ({ children, title, description, target }) => {
    const {setActive } = useContext(PanelContext);
    function handleClick() {
        setActive(target);
    }
    return (
        <>
            <li className="list-group-item response" onClick={handleClick}>
                <div className="d-flex">
                    <div className="me-3">
                        <ArrowRightSquareFill color="royalblue" size={36} />
                    </div>
                    <div>
                        <h6 className="title text-primary mb-1">{title}</h6>
                        <p className="description text-muted fs-6 my-0">{description}</p>
                        {children}
                    </div>
                </div>
            </li>
        </>
    );
};

const Action = ({ title, children }) => {
    return <li className="list-group-item" >
        <h6 className="title text-primary mb-1">{title}</h6>
        {children}
    </li>;
};

function WizardFactory({ data }) {
    let content = [];

    function parsePanel(element) {
        if (element.type === "Panel") {
            content.push(
                <Panel id={element.id} title={element.title} subtitle={element.subtitle} children={parseChildren(element.children)} />
            )
        } else {
            console.error("Panel was expected", element)
        }
    }

    function parseChildren(children) {
        let content = [];
        children.forEach(element => {
            let child = null;

            switch (element.type) {
                case "Response":
                    child = parseResponse(element)
                    break;

                case "Action":
                    child = parseAction(element);
                    break;

                case "Fragment":
                    child = parseFragment(element);
                    break;

                default:
                    console.error('unable to parse', element);
                    break;
            }

            if (child !== null) {
                content.push(child);
            }
        })
        return content
    }

    function parseResponse(element){
        return (
            <Response title={element.title} description={element.description} target={element.target} children={parseChildren(element.children)} />
        )
    }

    function parseAction(element){
        return(
            <Action title={element.title} children={parseChildren(element.children)} />
        );
    }

    function parseFragment(element){
        if (element.children!==undefined) {
            return(<div dangerouslySetInnerHTML={{__html: element.children}} />);
        } else {
            return(<></>);
        }
    }

    if (Array.isArray(data)) {
        data.forEach(element => {
            content.push(parsePanel(element))
        })
    }

    return (
        <Wizard>{content}</Wizard>
    )
}

export default HowTo;