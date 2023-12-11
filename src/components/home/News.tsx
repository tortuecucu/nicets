
import { Article, useNews } from '../../hooks/backend/useNews';
import { TimeAgo } from '../utils/TimeAgo';
import { DataManager } from '../puller/DataPuller';
import { Render } from '../utils/Render';

function News() {
    const { getNews } = useNews()

    return (
        <DataManager promise={getNews}>
            <NewsContent />
        </DataManager>
    )
}

const EmptyNewsList = () => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-4 mb-0">Aucun article n'est disponible actuellement !</h5>
        </div>
    )
}

function NewsContent() {
    const { activeNews } = useNews()
    const actives = activeNews()
    if (actives !== undefined) {
        const news: Array<Article> = actives
        return (
            <Render condition={(news !== undefined && news.length > 0)} fallback={<EmptyNewsList />}>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h5 className="pb-4 mb-0">Actualités de votre système d'information</h5>
                    <div className="list-group">
                        {news.map((article: Article) => {
                            return <NewsItem article={article} />
                        })}
                    </div>
                </div>
            </Render>
        )
    }
}

type NewsItemProps = {
    article: Article
}

function NewsItem(props: NewsItemProps) {
    return (
        <a href={props.article.href} className="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel='noreferrer'>
            <img src='/imgs/news.svg' alt='news' />
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 className="mb-0">{props.article.title}</h6>
                    <p className="mb-0 opacity-75">{props.article.description}</p>
                </div>
                <small className="opacity-50 text-nowrap"><TimeAgo date={Date.parse(props.article.startAt)} /></small>
            </div>
        </a>
    )
}

export default News;