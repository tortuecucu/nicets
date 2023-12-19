import { useApi } from "src/contexts/ApiProvider";
import { BackendResponse } from "src/types/api";

type CatalogItem = { 
    id: number;
    name: string;
    criticity: 1 | 2 | 3,
    range: string, 
    snName: string,
    owningCompany: number,
    isCore: boolean,
};

const useService = () => {
    const api = useApi();

    async function getServiceCatalog():BackendResponse<CatalogItem[]> {
        return await api.getHandler<CatalogItem[]>('/api/services/list', undefined);
    }

    return {
        getServiceCatalog,
    };
};

export default useService;
