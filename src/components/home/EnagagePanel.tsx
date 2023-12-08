const EngagePanel = () => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-2 mb-4">Réagissez, participez, améliorez !</h5>
            <div className="d-flex flex-row">
                <div className="image p-2">
                    <img src="/imgs/people.png" width="150"></img>
                </div>
                <div className="ps-2">
                    <p className="lead fs-5">Aidez-nous à améliorer encore votre satisfaction</p>
                    <p className="lead fs-6">Nous avons conçu ce portail pour qu'il vous donne accès à tout ce que vous avez besoin quand un incident informatique survient.</p>
                    <p className="lead fs-6">Nous avons besoin de vous pour savoir si nous avons atteint notre objectif et toujours faire mieux.</p>
                    <a href="/contribute" className="btn btn-success w-100 mb-4">Je participe à l'amélioration</a>
                </div>
            </div>
        </div>
    )
}

export { EngagePanel }