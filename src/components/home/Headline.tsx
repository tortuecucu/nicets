import { XCircle } from 'react-bootstrap-icons';
import { ErrorBoundary } from 'react-error-boundary';
import { Headline as HeadlineItem, HeadlineAction, useHeadline } from '../../api/useHeadline';
import {useId} from "react"

type HeadlineActionProps = {
  actions: Array<HeadlineAction>
}

function HeadlineActionLink(props: HeadlineActionProps) {
  const content = props.actions.map((action, index) =>
    <a key={useId()} className={index === 0 ? 'btn btn-primary btn-sm' : 'btn btn-light btn-sm ms-3'} href={action.href} role="button">{action.label}</a>
  );
  return (
    <>{content}</>
  )
}

type HeadlinePanelProps = {
  headline: HeadlineItem
}

function HeadlinePanel(props: HeadlinePanelProps) {
  return (
    <>
      <div className={'headline rounded shadow-sm mt-4 p-2 ' + props.headline.type}>
        <div className="d-flex">
          <div className="me-3 d-flex align-content-between">
            <XCircle className="my-auto" size={24} />
          </div>
          <div>
            <p className="title my-0">{props.headline.title}</p>
            <p className="description my-0">{props.headline.description}</p>
          </div>
          <div className="ms-auto py-2 me-2">
            <HeadlineActionLink actions={props.headline.actions} />
          </div>
        </div>
      </div>
    </>
  )
}

function Headline() {
  const {headline} = useHeadline()

  return (
    <>
      <ErrorBoundary fallback={<p>error on headline</p>}>
        {(headline && Array.isArray(headline) && headline.length > 0) && <HeadlinePanel headline={headline} />}
      </ErrorBoundary>
    </>
  )
}

export default Headline;