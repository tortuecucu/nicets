import { BackendResponse } from "src/types/api";
import { useApi } from "src/contexts/ApiProvider";

type UserProfile = {
    id: number,
    firstname: string,
    lastname: string,
    email : string,
    company: {
        id: number,
        name: string,
        trigram: string
    },
    site: {
        id: number,
        name: string,
        countryCode: string
    }
}

type UserService = {
    id: number,
    notify: boolean, 
    rank: number,
    serviceId: number,
    service: {
        id: number,
        name: string,
        criticity: number,
        owningCompany: number,
        range: string,
        snName: string,
        isCore: boolean
    }
}


/**
 * Custom hook for managing account data.
 */
const useAccount = () => {
    const api = useApi();
    
    /**
     * Retrieves the user profile from the backend.
     * @returns {Promise<BackendResponse<UserProfile>>} The backend response containing the user profile.
     */
    const getProfile = async (): BackendResponse<UserProfile> => {
        return await api.getHandler<UserProfile>('/api/me/profile', undefined);
    }

    /**
     * Retrieves the user roles from the backend.
     * @returns {Promise<BackendResponse<Array<string>>>} The response from the backend containing an array of roles.
     */
    const getRoles = (): string[] => {
        return ['admin', 'incident-admin', 'data-admin', 'user-admin'];
        //FIXME: return this.getHandler('/api/me/roles', []) //NEXT: uncomment and test
    }

    /**
     * Retrieves the user services list from the backend.
     * @returns A promise that resolves to a BackendResponse containing an array of UserService objects.
     */
    const getUserServices = async (): BackendResponse<UserService[]> => {
        return await api.getHandler<UserService[]>('/api/me/services', undefined);
    }

    //TODO: ensure function will return list of services
    //TODO: check payload type
    const updateUserServices = async (payload: UserService[]): BackendResponse<UserService[]> => {
        return await api.putHandler<UserService[]>('/api/me/services', payload, undefined);
    }

    /**
     * Deletes a user service from the backend.
     * @param subscriptionId The id of the service to delete.
     * @returns A promise that resolves to a BackendResponse containing a boolean indicating success.
     */
    const deleteUserService = async (subscriptionId: number): BackendResponse<boolean> => {
        if (!subscriptionId) {
            return [false, null];
        }
        return api.deleteHandler(`/api/me/service/${subscriptionId}`, undefined);
    }
    

    return {getProfile, getRoles, getUserServices, updateUserServices, deleteUserService}
};

export default useAccount;