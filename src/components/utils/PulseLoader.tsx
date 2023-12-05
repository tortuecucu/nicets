import { PulseLoader } from "react-spinners"

const PageLoader = () => {
    return(<>
    <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
                <PulseLoader color="#0d6efd" />
                <h1 className="text-secondary-emphasis">chargement...</h1>
                <p className="col-lg-8 mx-auto fs-5 text-body-secondary text-muted">rapide c'est possible mais c'est plus cher</p>
            </div>
        </div>
    </>)
}

export {PageLoader}