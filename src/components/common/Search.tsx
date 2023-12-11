
import { useMemo } from "react"
import { RenderOne } from "../utils/Render"

type SearchProp = {
    search: string
}

const SnowSearch = (prop: SearchProp) => {
    return (<a href={`https://safran.service-now.com/textsearch.do?sysparm_search=${prop.search}`} rel="noreferrer" target="_blank" className="btn btn-primary">Rechercher sur serviceNow</a>)
}

const UnknownIncident = (prop: SearchProp) => {
    return (<>
        <h5>L'élément {prop.search} n'est pas référencé sur ce portail</h5>
        <p>Deux raisons peuvent l'expliquer:</p>
        <ul>
            <li>L'incident est trop récent</li>
            <li>L'impact connu de l'incident ne lui permet pas de figurer ici</li>
        </ul>
        <SnowSearch search={prop.search} />
    </>) //NEXT: ajouter un bouton permettant d'aller au poka yoke
}

const OtherTicket = (prop: SearchProp) => {
    return (<>
        <h5>Cette référence ne correspond pas à un incident</h5>
        <p>Vous avez bien une régérence de ticket, mais ce n'est pas un incident. Il n'est donc pas référencé dans ce portail</p>
        <SnowSearch search={prop.search} />
    </>)
}

const BadSearch = (prop: SearchProp) => {
    return (<>
        <h5>Nous ne savons pas où chercher !</h5>
        <p>Votre recherche '{prop.search}' ne correspond à rien de connu ici.</p>
        <p>Dans sa version actuelle, le portail ne sait que chercher des références d'incident. </p>
    </>)
}

enum Feedback {
    UnknownIncident = 0,
    OtherSnowTocket = 1,
    BadSearch = 2
}

const SearchNoResult = (prop: SearchProp) => {
    const feedback: Feedback = useMemo(() => {
        if (String(prop.search).substring(0, 3) === 'INC') {
            return Feedback.UnknownIncident;
        }

        const regex = /[A-Z]{3,4}\d{6,12}/gm;
        if (regex.test(prop.search)) {
            return Feedback.OtherSnowTocket;
        }

        return Feedback.BadSearch;
    }, [prop.search])
    return (
        <>
            <RenderOne>
                <RenderOne.Render condition={feedback === 0}><UnknownIncident search={prop.search} /></RenderOne.Render>
                <RenderOne.Render condition={feedback === 1}><OtherTicket search={prop.search} /></RenderOne.Render>
                <RenderOne.Render condition={feedback === 2}><BadSearch search={prop.search} /></RenderOne.Render>
            </RenderOne>
        </>
    )
}

export { SearchNoResult }