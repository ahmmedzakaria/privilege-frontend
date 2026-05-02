import {ApiEndpoint} from "./model/endpoint";

export enum ActionTypes {
    CREATE = 1,
    UPDATE = 2,
    DELETE = 3,
    SEARCH = 4,
    LOGIN = 5,
    AUTH = 6,
}

export const ApiEndpoints: { [key: string]: ApiEndpoint } = {
    // KYC
    KYC_CREATE: { service: 'KYC', apiPath: 'kyc/create', actionType: ActionTypes.CREATE, isMultiPart: true },
    KYC_UPDATE: { service: 'KYC', apiPath: 'kyc/update', actionType: ActionTypes.UPDATE, isMultiPart: true },
    KYC_DELETE: { service: 'KYC', apiPath: 'kyc/delete', actionType: ActionTypes.DELETE },
    KYC_SEARCH: { service: 'KYC', apiPath: 'kyc/search', actionType: ActionTypes.SEARCH },
    KYC_GET: { service: 'KYC', apiPath: 'kyc/get-by-id', actionType: ActionTypes.SEARCH },

    // Authentication
    KYC_LOGIN: { service: 'LOGIN', apiPath: 'auth/authenticate', actionType: ActionTypes.LOGIN },

    PRIVILEGE_SAVE: { service: 'AUTH', apiPath: 'auth/privilege/save', actionType: ActionTypes.AUTH },
    PRIVILEGE_LIST: { service: 'AUTH', apiPath: 'auth/privilege/list', actionType: ActionTypes.AUTH },
    PRIVILEGE_DEFINITIONS: { service: 'AUTH', apiPath: 'auth/privilege/definitions', actionType: ActionTypes.AUTH },
    PRIVILEGE_CHECK: { service: 'AUTH', apiPath: 'auth/privilege/check', actionType: ActionTypes.AUTH },
    PRIVILEGE_MY_CODES: { service: 'AUTH', apiPath: 'auth/privilege/my-codes', actionType: ActionTypes.AUTH },
    PRIVILEGE_ASSIGN_ROLE: { service: 'AUTH', apiPath: 'auth/privilege/assign-role', actionType: ActionTypes.AUTH },
    PRIVILEGE_ASSIGN_USER: { service: 'AUTH', apiPath: 'auth/privilege/assign-user', actionType: ActionTypes.AUTH },

    PERSON_CREATE: { service: 'PERSON', apiPath: 'v1/person/create', actionType: ActionTypes.CREATE, isMultiPart: true },
    PERSON_UPDATE: { service: 'PERSON', apiPath: 'v1/person/update', actionType: ActionTypes.UPDATE, isMultiPart: true },
    PERSON_SEARCH: { service: 'PERSON', apiPath: 'v1/person/search', actionType: ActionTypes.SEARCH },
    PERSON_DELETE: { service: 'PERSON', apiPath: 'v1/person/delete', actionType: ActionTypes.DELETE },
    PERSON_PHOTO: { service: 'PERSON', apiPath: 'v1/person/photo', actionType: ActionTypes.SEARCH },

    GIS_SEARCH: { service: 'GIS', apiPath: 'locations/search', actionType: ActionTypes.SEARCH },
    GIS_GET_BY_ID: { service: 'GIS', apiPath: 'locations/get-by-id', actionType: ActionTypes.SEARCH },

};
