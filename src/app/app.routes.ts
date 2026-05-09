import { Routes } from '@angular/router';
import { AUTH_ROUTES, authGuard } from '@nexacore/auth';

export const routes: Routes = [
    ...AUTH_ROUTES,
    {
        path: '',
        loadComponent: () =>
            import('@nexacore/layout').then(m => m.LayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'privileges',
                loadComponent: () =>
                    import('./pages/privilege-management/privilege-management.component')
                        .then(m => m.PrivilegeManagementComponent),
            },
            {
                path: '',
                redirectTo: 'privileges',
                pathMatch: 'full',
            },
        ],
    },
    { path: '**', redirectTo: 'privileges' },
];
