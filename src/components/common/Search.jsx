import { useMemo } from "react"


const SnowSearch = ({ search }) => {
    return <a href={`https://safran.service-now.com/textsearch.do?sysparm_search=${search}`} rel="noreferrer" target="_blank" className="btn btn-primary">Rechercher sur serviceNow</a>
}

const UnknownIncident = ({ search }) => {
    return (<>
        <h5>L'incident {search} n'est pas référencé sur ce portail</h5>
        <p>Deux raisons peuvent l'expliquer:</p>
        <ul>
            <li>L'incident est trop récent</li>
            <li>L'impact connu de l'incident ne lui permet pas de figurer ici</li>
        </ul>
        <SnowSearch search={search} /> 
    </>) //NEXT: ajouter un bouton permettant d'aller au poka yoke
}

const OtherTicket = ({ search }) => {
    return (<>
        <h5>Cette référence ne correspond pas à un incident</h5>
        <p>Vous avez bien une régérence de ticket, mais ce n'est pas un incident. Il n'est donc pas référencé dans ce portail</p>
        <SnowSearch search={search} />
    </>)
}

const BadSearch = ({ search }) => {
    return (<>
        <h5>Nous ne savons pas où chercher !</h5>
        <p>Votre recherche '{search}' ne correspond à rien de connu ici.</p>
        <p>Dans sa version actuelle, le portail ne sait que chercher des références d'incident. </p>
    </>)
}

const SearchNoResult = ({ search }) => {
    const feedback = useMemo(() => {
        if (String(search).substring(0, 3) === 'INC') {
            return 0;
        }

        const regex = /[A-Z]{3,4}\d{6,12}/gm;
        if (regex.test(search)) {
            return 1;
        }

        return 2;
    }, [search])
    return (
        <>
            {feedback === 0 && <UnknownIncident search={search} />}
            {feedback === 1 && <OtherTicket search={search} />}
            {feedback === 2 && <BadSearch search={search} />}
        </>
    )
}


export { SearchNoResult }