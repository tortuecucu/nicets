import { useState } from "react"
import { useApi } from "../../contexts/ApiProvider"
import dayjs from "dayjs"
import { useMount } from "../custom/useMount"

//TODO: cache data for the session duration

export type Article = {
    id: number,
    href: string,
    title: string,
    description: string,
    startAt: any
    endAt: any
}

const useNews = () => {
    const api = useApi()
    const [news, setNews] = useState<Array<Article>>()

    const fetchNews = async () => {
            const [rows, err] = await api.getNewslink();
            if (err) {
                console.error(err);
            } else {
                if (rows.length > 1) {
                    rows.sort((a: Article, b: Article) => Date.parse(b.startAt) - Date.parse(a.startAt));
                }
                setNews(rows);
            }

        }

    useMount(() => {        
        fetchNews()
    })

    const getNews = async (): Promise<Array<Article> | undefined> => {
        if (news === undefined) {
          await fetchNews()
        } 
        return news
    }

    const activeNews = (): Array<Article> | undefined => {
        return  news?.filter((article: Article) => {
            let start = dayjs(article.startAt);
            let end = dayjs(article.endAt);
            let now = dayjs()
            if (start.isBefore(now) && (article.endAt === null || end.isAfter(now))) {
                return true
            } else {
                return false
            }
        })
    }

    return { news, activeNews, getNews }
}

export { useNews }