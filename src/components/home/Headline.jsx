import { useState, useEffect } from 'react';
import { useApi } from '../../contexts/ApiProvider';
import { XCircle } from 'react-bootstrap-icons';
import { ErrorBoundary } from 'react-error-boundary';

function HeadlineAction({ actions }) {
  const content = actions.map((action, index) =>
    <a key={'btn' + index} className={index === 0 ? 'btn btn-primary btn-sm' : 'btn btn-light btn-sm ms-3'} href={action.href} role="button">{action.label}</a>
  );
  return (
    <>{content}</>
  )
}

function HeadlinePanel({ data }) {
  return (
    <>
      <div className={'headline rounded shadow-sm mt-4 p-2 ' + data.type}>
        <div className="d-flex">
          <div className="me-3 d-flex align-content-between">
            <XCircle className="my-auto" size={24} />
          </div>
          <div>
            <p className="title my-0">{data.title}</p>
            <p className="description my-0">{data.description}</p>
          </div>
          <div className="ms-auto py-2 me-2">
            <HeadlineAction actions={data.actions} />
          </div>
        </div>
      </div>
    </>
  )
}

function Headline() {
  const api = useApi();
  const [headline, setHeadline] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [resp, err] = await api.getHeadline();
      if (err) {
        console.error(err);
      } else {
        setHeadline(resp);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<p>error on headline</p>}>
        {(headline && Array.isArray(headline) && headline.length > 0) && <HeadlinePanel data={headline} />}
      </ErrorBoundary>
    </>
  )
}

export default Headline;