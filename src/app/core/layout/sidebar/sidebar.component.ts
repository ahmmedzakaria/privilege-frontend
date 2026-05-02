import { Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {AuthService} from "../../services/auth/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

interface SidebarItem {
    label: string;
    icon?: string;
    path?: string;
    roles: string[];
    children?: { label: string; path: string }[];
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('slideToggle', [
            transition(':enter', [
                style({ height: 0, opacity: 0, overflow: 'hidden' }),
                animate('250ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ height: '*', opacity: 1, overflow: 'hidden' }),
                animate('250ms ease-in', style({ height: 0, opacity: 0 }))
            ])
        ]),
        trigger('rotateArrow', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(90deg)' })),
            transition('collapsed <=> expanded', animate('200ms ease'))
        ])
    ]
})
export class SidebarComponent {
    constructor(private auth: AuthService) {}

    @Input() collapsed = false;

    expandedMenu = signal<string | null>(null);

    menuItems: SidebarItem[] = [
        {
            label: 'Privileges',
            path: '/privileges',
            icon: 'fa fa-shield-halved',
            roles: ['ROLE_ADMIN']
        },
    ];


    get visibleItems() {
        return this.menuItems.filter(item => item.roles.some(r => this.auth.hasRole(r)));
    }

    toggleSubMenu(label: string) {
        this.expandedMenu.set(this.expandedMenu() === label ? null : label);
    }

    isExpanded(label: string): boolean {
        return this.expandedMenu() === label;
    }
}
