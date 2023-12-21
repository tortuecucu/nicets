import { XCircle } from 'react-bootstrap-icons';
import { useId } from "react"
import { DataManager, useResponseContext } from '../puller/DataPuller';
import { useHeadline, HeadlineType, HeadlineActionType } from 'src/hooks/backend/useHeadline'

type HeadlineActionProps = {
  actions: Array<HeadlineActionType>
}

function HeadlineActionLink(props: HeadlineActionProps) {
  return (
    <>{props.actions && props.actions.map((action, index) =>
      <a key={useId()} className={index === 0 ? 'btn btn-primary btn-sm' : 'btn btn-light btn-sm ms-3'} href={action.href} role="button">{action.label}</a>
    )}</>
  )
}

function HeadlineContent() {
  const { data: headline } = useResponseContext<HeadlineType>()
  return (
    <>
      <div className={'headline rounded shadow-sm mt-4 p-2 ' + headline.type}>
        <div className="d-flex">
          <div className="me-3 d-flex align-content-between">
            <XCircle className="my-auto" size={24} />
          </div>
          <div>
            <p className="title my-0">{headline.title}</p>
            <p className="description my-0">{headline.description}</p>
          </div>
          <div className="ms-auto py-2 me-2">
            <HeadlineActionLink actions={headline.actions} />
          </div>
        </div>
      </div>
    </>
  )
}

function Headline() {
  const { getHeadline } = useHeadline()

  const successFunc = (response: HeadlineType): boolean => {
    if (response === null || response === undefined) {
      return false
    }
    return true
  }

  return (
    <>
      <DataManager promise={getHeadline} toast={undefined} loadingElement={<></>} successFunc={successFunc} fallback={<></>}>
        <HeadlineContent />
      </DataManager>
    </>
  )
}

export default Headline;