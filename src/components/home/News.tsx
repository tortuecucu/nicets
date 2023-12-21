
import { useNews } from '../../hooks/backend/useNews';
import { TimeAgo } from '../utils/TimeAgo';
import { DataManager, useResponseContext } from '../puller/DataPuller';
import { Render } from '../utils/Render';
import { Article } from 'src/types/news';

function News() {
    const { getLiveArticles } = useNews()

    const fetchData = async () => {
        const active = await getLiveArticles()
        return active
    }

    return (
        <DataManager promise={fetchData} toast={undefined}>
            <NewsContent />
        </DataManager>
    )
}

const EmptyNewsList = () => {
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className='d-flex flex-column justify-content-center'>
                <img className="pt-3 ms-auto me-auto mb-3" src='/imgs/newspaper.svg' alt='news' width={250}/>
                <h5 className="py-2 mb-0 text-center">Aucune actualité publiée actuellement</h5>
                <p className='text-center text-muted'>Consultez cette rubrique régulièrement pour voir les prochaines actualités du système d'information.</p>
            </div>
        </div>
    )
}

function NewsContent() {
    const { data } = useResponseContext()
    const actives = data as Array<Article>
    if (actives !== undefined) {
        const news: Array<Article> = actives
        return (
            <Render condition={(news !== undefined && news.length > 0)} fallback={<EmptyNewsList />}>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h5 className="pb-4 mb-0">Actualités de votre système d'information</h5>
                    <div className="list-group">
                        {news.map((article: Article) => {
                            return <NewsItem article={article} key={article.id} />
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
                <small className="opacity-50 text-nowrap"><TimeAgo date={props.article.startAt} /></small>
            </div>
        </a>
    )
}

export default News;