import { ErrorBoundary } from "react-error-boundary";
import LazyLoader from "src/router/LazyLoader";
import { ReactElement, ReactNode } from 'react'
import { getChildrenByType } from 'react-nanny';


interface NoticeProps {
    id: string,
    elementPath: string,
    element: ReactNode,
    dispatcher: {
        shouldDisplay: boolean
    }
}

const Notice = (props: NoticeProps) => {
    return (
        <ErrorBoundary fallback={<>error</>}>
            {(props.element) ? props.element : <LazyLoader path={props.elementPath} />}
        </ErrorBoundary>
    )
}
Notice.defaultProps = {
    element: undefined
}

interface NoticesProps {
    children: ReactNode,
    errorFallback: React.JSX.Element
}

interface NoticeElement {
    props: NoticeProps
}

const Notices = (props: NoticesProps) => {
    const wasDisplayed = (sessionStorage.getItem('notice_displayed')) ? true : false
    const notice = getChildrenByType<NoticeElement>(props.children as ReactElement, Notice)
        .find((c: NoticeElement) => c.props && c.props.dispatcher.shouldDisplay);

    return (
        <>{notice && !wasDisplayed ? <ErrorBoundary fallback={props.errorFallback}>{notice as ReactNode}</ErrorBoundary> : <></>}</>
    )
}
Notices.Item = Notice
Notices.defaultProps = {
    errorFallback: <>Error</>
}

export { Notices }