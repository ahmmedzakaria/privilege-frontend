import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiEndpoints } from '../api/api-endpoints';

export interface Privilege {
    id?: number;
    privilegeCode: string;
    moduleCode: string;
    moduleName: string;
    featureTypeCode: string;
    featureTypeName: string;
    featureCode: string;
    featureName: string;
    actionCode: string;
    actionName: string;
    active: boolean;
}

export interface PrivilegeRequest {
    moduleCode: string;
    moduleName: string;
    featureTypeCode: string;
    featureTypeName: string;
    featureCode: string;
    featureName: string;
    actionCode: string;
    actionName: string;
    active: boolean;
}

export interface PrivilegeAssignmentRequest {
    roleId?: number | null;
    userId?: number | null;
    privilegeCodes: string[];
}

export interface PrivilegeCheckRequest {
    username?: string;
    privilegeCode?: string;
    moduleCode?: string;
    featureTypeCode?: string;
    featureCode?: string;
    actionCode?: string;
}

export interface PrivilegeCheckResponse {
    username: string;
    privilegeCode: string;
    allowed: boolean;
}

export interface PrivilegeActionDefinition {
    actionCode: string;
    actionName: string;
    privilegeCode: string;
}

export interface PrivilegeFeatureDefinition {
    moduleCode: string;
    moduleName: string;
    featureTypeCode: string;
    featureTypeName: string;
    featureCode: string;
    featureName: string;
    menuLabel: string;
    icon?: string;
    actions: PrivilegeActionDefinition[];
}

@Injectable({ providedIn: 'root' })
export class PrivilegeService {
    constructor(private apiService: ApiService) {}

    savePrivilege(request: PrivilegeRequest): Observable<Privilege> {
        return this.apiService.post<Privilege>(ApiEndpoints.PRIVILEGE_SAVE, request);
    }

    listPrivileges(): Observable<Privilege[]> {
        return this.apiService.post<Privilege[]>(ApiEndpoints.PRIVILEGE_LIST, {});
    }

    listDefinitions(): Observable<PrivilegeFeatureDefinition[]> {
        return this.apiService.post<PrivilegeFeatureDefinition[]>(ApiEndpoints.PRIVILEGE_DEFINITIONS, {});
    }

    checkPrivilege(request: PrivilegeCheckRequest): Observable<PrivilegeCheckResponse> {
        return this.apiService.post<PrivilegeCheckResponse>(ApiEndpoints.PRIVILEGE_CHECK, request);
    }

    getMyPrivilegeCodes(): Observable<string[]> {
        return this.apiService.post<string[]>(ApiEndpoints.PRIVILEGE_MY_CODES, {});
    }

    assignRolePrivileges(request: PrivilegeAssignmentRequest): Observable<void> {
        return this.apiService.post<void>(ApiEndpoints.PRIVILEGE_ASSIGN_ROLE, request);
    }

    assignUserPrivileges(request: PrivilegeAssignmentRequest): Observable<void> {
        return this.apiService.post<void>(ApiEndpoints.PRIVILEGE_ASSIGN_USER, request);
    }
}
