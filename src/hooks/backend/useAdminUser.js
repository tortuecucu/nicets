
import {useBackend} from "./useBackend"

type Response = {
    success: boolean,
    data: any,
    request: any,
    error: any,
    query: any
}

type UserCoreProperties = {
    id: number,
    firstname: string,
    lastname: string,
    email: string
}

type SearchMatch = {
    ...UserCoreProperties,
    value: string
}

type User = {
    ...UserCoreProperties
}

type UserFormData = {
    ...UserCoreProperties
}

type UserImportRequest = {
    email: string,
    firstname: string,
    lastname: string,
    site: string
}

type ResponseSearchUsers = {
    ...Response,
    data: Array<SearchMatch>
}

type ResponseImportUser = {
    created: boolean,
    email: string,
    code: number
}

type ResponseImport = {
    ...Response,
    data: Array<ResponseImportUser>
}

type RenewResponse = {
    ...Response,
    data: number
}

type ResponseUser = {
    ...Response,
    data: User
}

const useAdminUser = (): Object  => {

    const BASE_URL = '/api/user-management'

    //TODO: use real camm
    const searchUsers = async (emailPart: string): Promise<ResponseSearchUsers> => {
        return {
            success: true,
            data: [
                {
                    id: 1,
                    value: 'user.one@safrangroup.com',
                    email: 'user.one@safrangroup.com',
                    firstname: 'john',
                    lastname: 'doe'
                },
                {
                    id: 2,
                    value: 'user.two@safrangroup.com',
                    email: 'user.two@safrangroup.com',
                    firstname: 'john',
                    lastname: 'doe'
                }, 
                {
                    id: 3,
                    value: 'user.three@safrangroup.com',
                    email: 'user.three@safrangroup.com',
                    firstname: 'john',
                    lastname: 'doe'
                }
            ],
            request: undefined,
            error: undefined,
            query: undefined
        }

    }

    //TODO: use real camm
    const upsertUser = async (data: UserFormData): Promise<Response> => {
        return {
            success: true,
            data: undefined,
            request: undefined,
            error: null,
            query: undefined
        }
    }

    //TODO: use real camm
    const editUserCode = async (userId: number): Promise<RenewResponse> => {
        await new Promise(resolve => setTimeout(resolve, 5000))
        await api.getRequest('http://www.hfhjffkfkf.com')
        return {
            success: true,
            data: 123459,
            request: undefined,
            error: null,
            query: undefined
        }
    }


    //TODO: use real camm
    const importUsers = async (users: Array<UserImportRequest>): Promise<ResponseImport> => {
        await new Promise(resolve => setTimeout(resolve, 5000))
        return {
            success: true,
            data: users.map(u => {
                return {
                    created: true,
                    email: u.email,
                    code: 123456
                }
            }),
            request: undefined,
            error: null,
            query: undefined
        }
    }

    //TODO: use real camm
    const fetchUser = async (userId: number): Promise<ResponseUser> => {
        await new Promise(resolve => setTimeout(resolve, 5000))
        return {
            success: true,
            data: {
                id: userId,
                email: "francois-xavier.zakrzewski@safrangroup.com",
                firstname: 'john',
                lastname: 'doe'
            },
            request: undefined,
            error: null,
            query: undefined
        }
    }

    type UserRole = {
        userId: number,
        roleId: number,
        name: string,
        granted: boolean
    }

    //TODO: code it
    const getUserRoles = (userId: number) => Promise<Array<UserRole>> {}

    //TODO: code it
    const setUserRoles = (userId: number) => Promise<boolean> {}

    return { searchUsers, upsertUser, editUserCode, importUsers, fetchUser, getUserRoles, setUserRoles }

}
export { useAdminUser }



    // const createUsers = async (users: Array<ToBeDefined>) => {
    //     return users.map(u => {
    //         return {
    //             ...u,
    //             result: true,
    //             code: 123456
    //         }
    //     })
    // }

    // return { createUsers }




//   async getUSerRoles(userId) {
//     return [
//       {
//         id: 1,
//         name: 'granted role name',
//         granted: true
//       },
//       {
//         id: 2,
//         name: 'ungranted role',
//         granted: false
//       }
//     ]
//   }