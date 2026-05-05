import {ActionTypes, ApiEndpoint} from "@kyc/api-common";

export const ApiEndpoints: { [key: string]: ApiEndpoint } = {
    KYC_LOGIN: { service: 'LOGIN', apiPath: 'auth/authenticate', actionType: ActionTypes.LOGIN },

    PRIVILEGE_CONTEXT: { service: 'AUTH', apiPath: 'auth/privilege/context', actionType: ActionTypes.AUTH },
    PRIVILEGE_SAVE: { service: 'AUTH', apiPath: 'auth/privilege/save', actionType: ActionTypes.AUTH },
    PRIVILEGE_LIST: { service: 'AUTH', apiPath: 'auth/privilege/list', actionType: ActionTypes.AUTH },
    PRIVILEGE_DEFINITIONS: { service: 'AUTH', apiPath: 'auth/privilege/definitions', actionType: ActionTypes.AUTH },
    SUB_MENU_SAVE: { service: 'AUTH', apiPath: 'auth/privilege/sub-menu/save', actionType: ActionTypes.AUTH },
    SUB_MENU_LIST: { service: 'AUTH', apiPath: 'auth/privilege/sub-menu/list', actionType: ActionTypes.AUTH },
    PRIVILEGE_CHECK: { service: 'AUTH', apiPath: 'auth/privilege/check', actionType: ActionTypes.AUTH },
    PRIVILEGE_MY_CODES: { service: 'AUTH', apiPath: 'auth/privilege/my-codes', actionType: ActionTypes.AUTH },
    PRIVILEGE_ASSIGN_ROLE: { service: 'AUTH', apiPath: 'auth/privilege/assign-role', actionType: ActionTypes.AUTH },
    PRIVILEGE_ASSIGN_USER: { service: 'AUTH', apiPath: 'auth/privilege/assign-user', actionType: ActionTypes.AUTH },
};
