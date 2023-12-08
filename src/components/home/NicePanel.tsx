const NicePanel = () => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-2 mb-4">Le projet NICE en 2 minutes</h5>
            <div className="d-flex flex-row">
                <div className="image">
                    <img src="src/assets/team.png" width="150"></img>
                </div>
                <div className="text">
                    <p className="lead fs-5">New Incident Cooperative Experience</p>
                    <p className="lead fs-6">NICE est un projet green belt dont le but est d'améliorer la satisfaction des utilisteurs lorsque nous traitons les incidents informatiques.</p>
                    <p className="lead fs-6">Découvrez en quelques minutes les informations clés du projet.</p>
                    <a href="/nice" className="btn btn-outline-primary w-100 mb-4">Je découvre le projet NICE</a>
                </div>
            </div>
        </div>
    )
}

export { NicePanel }