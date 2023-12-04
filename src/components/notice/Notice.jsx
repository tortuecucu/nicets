import { lazy, Children, useState, Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMount } from "../../hooks/useMount";
import PropTypes from "prop-types"

const Notice = ({ id, elementPath, element, dispatcher }) => {
    return (
        <>
            <ErrorBoundary fallback={<></>}>
                {element && element}
                {!element && <NoticeContentLoader elementPath={elementPath} />}         
            </ErrorBoundary>
        </>
    )
}
Notice.propTypes = {
    id: PropTypes.string,
    elementPath: PropTypes.string,
    element: PropTypes.element,
    dispatcher: PropTypes.object
}
Notice.defaultProps = {
    element: undefined
}

const NoticeContentLoader = ({ elementPath }) => {
    //FIXME: path is not resolved try to use absolute path to fix it
    const Element = lazy(() => import(elementPath))
    return (
        <Suspense fallback={<div>loading</div>}>
            <Element />
        </Suspense>
    )
}

const Notices = ({ children }) => {
    const [activeId, setActiveId] = useState(undefined)
    const wasDisplayed = useMemo(()=>{
        return sessionStorage.getItem('notice_displayed') ?? false
    }, [])

    useMount(() => {
        const items = Children.toArray(children)
            .filter(c => c.type.name === 'Notice')
            .filter(c => c.props.dispatcher.shouldDisplay)

        if (items.length > 0) {
            setActiveId(items[0].props.id)
            sessionStorage.setItem('notice_displayed', true)
        }

    })

    const activeItem = () => {
        return children.filter(c => c.props.id === activeId)
    }

    return (
        <ErrorBoundary fallback={<></>}>
            {(activeId && !wasDisplayed) &&  activeItem()}
        </ErrorBoundary>
    )
}
Notices.Item = Notice

export { Notices }