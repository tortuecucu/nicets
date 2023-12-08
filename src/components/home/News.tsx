import { ErrorBoundary } from 'react-error-boundary';
import { Article, useNews } from '../../hooks/backend/useNews';
import { TimeAgo } from '../utils/TimeAgo';

function News() {
    const {activeNews} = useNews()
    const news = activeNews()

    return (
        <>
            <ErrorBoundary fallback={<p>error on news</p>}>
                {news!==undefined && <NewsPanel news={news} />}
            </ErrorBoundary>
        </>
    )
}

type NewsPanelProps = {
    news: Array<Article>
}

function NewsPanel(props: NewsPanelProps) {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-4 mb-0">Actualités de votre système d'information</h5>
            {props.news.length > 0 ? (
                <div className="list-group">
                    {props.news.map((article: Article) => {
                        return <NewsLink article={article}/>
                    })}
                </div>
            ) : (
                <p className="lead">Aucune actualité pour le moment</p>
            )}
        </div>
    )
}

type NewsLinkProps = {
    article: Article
}

function NewsLink(props: NewsLinkProps) {
    return (
        <a href={props.article.href} className="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel='noreferrer'>
            <img src='/imgs/news.svg' alt='news'/>
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 className="mb-0">{props.article.title}</h6>
                    <p className="mb-0 opacity-75">{props.article.description}</p>
                </div>
                <small className="opacity-50 text-nowrap"><TimeAgo date={Date.parse(props.article.startAt)}/></small>
            </div>
        </a>
    )
}

export default News;