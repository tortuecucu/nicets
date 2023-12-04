import { useState, useEffect } from 'react';
import { useApi } from '../../contexts/ApiProvider';
import ReactTimeAgo from 'react-time-ago';
import { ErrorBoundary } from 'react-error-boundary';
import { useMemo } from 'react';

function News() {
    const api = useApi();
    const [news, setNews] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const [rows, err] = await api.getNewslink();
            if (err) {
                console.error(err);
            } else {
                if (rows.length > 1) {
                    rows.sort((a, b) => Date.parse(b.start) - Date.parse(a.start));
                }
                setNews(rows);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <ErrorBoundary fallback={<p>error on news</p>}>
                {news && <NewsPanel news={news} />}
            </ErrorBoundary>
        </>
    )
}

function NewsPanel({ news }) {
    const [active, setActive] = useState(false);

    const items = useMemo(() => {
        const items = news.map((article) => {
            let start = Date.parse(article.startAt);
            let end = Date.parse(article.endAt);
            let now = new Date();
            if (start <= now && (article.endAt===null || end >= now)) {
                setActive(true);
                return <NewsLink key={article.id.toString()} article={article} />
            }
            return null
        });
        return items;
    }, [news])


    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-4 mb-0">Actualités de votre système d'information</h5>
            {active > 0 ? (
                <div className="list-group">
                    {items}
                </div>
            ) : (
                <p className="lead">Aucune actualité pour le moment</p>
            )}
        </div>
    )
}

function NewsLink({ article }) {
    return (
        <a href={article.href} className="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel='noreferrer'>
            <img src='/assets/news.svg' alt='news'/>
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 className="mb-0">{article.title}</h6>
                    <p className="mb-0 opacity-75">{article.description}</p>
                </div>
                <small className="opacity-50 text-nowrap"><ReactTimeAgo date={Date.parse(article.startAt)} locale="en-US" /></small>
            </div>
        </a>
    )
}

export default News;