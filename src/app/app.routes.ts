import { Routes } from '@angular/router';
import { authGuard } from '@nexacore/auth';
import { loginGuard } from '@nexacore/auth';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('@nexacore/auth').then(m => m.LoginComponent),
        canActivate: [loginGuard],
    },
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
