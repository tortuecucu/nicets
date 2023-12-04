function ErrorPanel({ children }) {
    return (
        <div className="my-3 p-2 bg-danger rounded shadow-sm">
            <p className="text-white my-0">Oops, une erreur est survenue</p>
            { children }
        </div>
    );
}

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <>
            <div className="alert alert-danger d-flex align-items-center" role="alert">
                <p>Erreur de chargement !</p>
                <p>faites une capture d'écran et envoyez-la à l'équipe !</p>
                {error}
            </div>
        </>
    )
}


export {ErrorPanel, ErrorFallback}