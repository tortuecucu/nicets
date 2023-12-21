import { useApi } from "../../contexts/ApiProvider"
import useDate from "./useDate"
import { useMount } from "../custom/useMount"
import { Article } from "src/types/news"
import { useArray } from "../custom/useArray"
import dayjs from "dayjs"
interface DeletePayload {
    id: number,
}

interface AddPayload {
    id: never,
    href: string,
    title: string,
    description: string,
    startAt?: any
    endAt?: any
    companyId?: number,
    type?: string,
    published?: boolean,
}

interface UpdatePayload {
    id: number,
    href: string,
    title: string,
    description: string,
    startAt?: any
    endAt?: any
    companyId?: number,
    type?: string,
    published?: boolean,
}

//TODO: cache data for the session duration

const useNews = () => {
    const api = useApi()
    const { array: articles, set, remove, updateItem, push } = useArray<Article>(undefined)
    
    /**
     * Fetches articles from the backend.
     * @returns {Promise<void>} A promise that resolves when the articles are fetched.
     */
    const fetchArticles = async () => {
        const [rows, err] = await api.getHandler<Array<any>>('/api/home/news', undefined);
        if (err) {
            console.error(err);
            return
        } else if (rows && rows.length > 1) {
            const sorted = rows.sort((a: Article, b: Article) => dayjs(b.startAt).diff(dayjs(a.startAt)))
            set(sorted)
        }
    }

    useMount(() => {
        fetchArticles()
    })

    /**
     * Retrieves articles from memory, otherwise rerieves it from the backend.
     * @returns A promise that resolves to an array of articles, or undefined if an error occurs.
     */
    const getAllArticles = async (): Promise<Array<Article> | undefined> => {
        if (articles === undefined) {
            await fetchArticles()
        }
        return articles
    }

    /**
     * Retrieves live articles from memory, otherwise rerieves it from the backend.
     * Live articles are articles that have started but not ended yet.
     * @returns A promise that resolves to an array of Article objects, or undefined if an error occurs.
     */
    const getLiveArticles = async (): Promise<Array<Article> | undefined> => {
        const {isActive} = useDate()
        if (articles === undefined) {
            await fetchArticles()
        }
        return articles?.filter((article: Article) => isActive(article.startAt, article.endAt))
    }

    /**
     * Deletes an article from the backend.
     * @param article - The article to be deleted.
     * @returns A promise that resolves to a boolean indicating whether the deletion was successful.
     */
    const deleteArticle = async (article: DeletePayload): Promise<boolean> => {
        if (article === null || article.id === null) {
            return false
        }
        const [success, err] = await api.deleteHandler('/api/home/news/' + article.id, undefined);
        if (err || success===null) {
            console.error(err);
            remove(article.id)
            return false
        }
        return success
    }

    /**
     * Updates an article.
     * @param article The article to be updated.
     * @returns A promise that resolves to the updated article or null if the update fails.
     */
    const updateArticle = async (article: UpdatePayload): Promise<Article | null> => {
        if (article === null || article.id === null) {
            return null
        }
        const [updatedArticle, err] = await api.putHandler<Article>('/api/home/news/' + article.id, article as Article, undefined);
        if (err || updatedArticle===null) {
            console.error(err);
            return null
        }
        updateItem(updatedArticle, (a: Article) => a.id === updatedArticle.id)
        return updatedArticle
    }

    /**
     * Adds an article to the list and to the backend.
     * @param article The article to be added.
     * @returns A promise that resolves to the added article, or null if the operation fails.
     */
    const addArticle = async (article: AddPayload): Promise<Article | null> => {
        if (article === null || article.id !== null) {
            return null
        }
        const [addedArticle, err] = await api.postHandler<Article>('/api/home/news/', article as Article, undefined);
        if (err || addedArticle===null) {
            console.error(err);
            return null
        }
        push(addedArticle)
        return addedArticle
    }

    return { articles, getLiveArticles, getAllArticles, deleteArticle, updateArticle, addArticle }
}

export { useNews }
