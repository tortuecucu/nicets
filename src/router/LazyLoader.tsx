import { PageLoader } from "src/components/utils/PulseLoader"
import { lazy, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

type LazyLoaderProps = {
    path: string,
    fallback: JSX.Element,
    errorFallback: JSX.Element
}

const Loader = (props: {path: string, fallback: JSX.Element}) => {
    const Component = lazy(() => import(props.path))
    return (
        <Suspense fallback={props.fallback}>
            <Component />
        </Suspense>
    )
}

const LazyLoader = (props: LazyLoaderProps) => {
    return (
        <ErrorBoundary fallback={props.errorFallback}>
            <Loader path={props.path} fallback={props.fallback} />
        </ErrorBoundary>
    )

}
LazyLoader.defaultProps = {
    fallback: <PageLoader />,
    errorFallback: <div>Something went wrong</div>
}

export default LazyLoader