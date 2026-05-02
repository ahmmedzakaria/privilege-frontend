import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../api/api-endpoints';
import { ApiService } from '../api/api.service';

export interface SidebarMenuItem {
    label: string;
    icon?: string;
    path?: string;
    privilegeCodes?: string[];
    children?: SidebarMenuItem[];
}

@Injectable({ providedIn: 'root' })
export class SidebarMenuService {
    constructor(private apiService: ApiService) {}

    loadSidebarMenu(): Observable<SidebarMenuItem[]> {
        return this.apiService.post<SidebarMenuItem[]>(ApiEndpoints.PRIVILEGE_SIDEBAR_MENU, {});
    }
}
