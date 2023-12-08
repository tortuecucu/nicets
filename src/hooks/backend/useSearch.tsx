import { useApi } from "../../contexts/ApiProvider"

const useSearch = () => {
    const api = useApi()

    const getOutageByIncidentNumber = async (inct: string): Promise<number | undefined> => {
        const [outage, err] = await api.getOutageByNumber(inct);
        if (err) {
            console.error(err);
            return undefined
        } else if (outage) {
            return outage.id;
        }
    }

    return { getOutageByIncidentNumber }
}

export { useSearch }