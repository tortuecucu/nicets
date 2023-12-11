import { ChildrenProp } from "src/types/common";

type  ErrorPanelProps = {
    children?: ChildrenProp
}

function ErrorPanel(props: ErrorPanelProps) {
    return (
        <div className="my-3 p-2 bg-danger rounded shadow-sm">
            <p className="text-white my-0">Oops, une erreur est survenue</p>
            {props.children && props.children}
        </div>
    );
}

type ErrorFallbackProps = {
    error?: any,
    resetErrorBoundary?: () => void
}

function ErrorFallback(props: ErrorFallbackProps) {
    return (
        <>
            <div className="alert alert-danger d-flex align-items-center" role="alert">
                <p>Erreur de chargement !</p>
                <p>faites une capture d'écran et envoyez-la à l'équipe !</p>
                {props.error}
            </div>
        </>
    )
}


export {ErrorPanel, ErrorFallback}