import { Routes } from '@angular/router';
import { authGuard } from '@kyc/auth';
import { loginGuard } from '@kyc/auth';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('@kyc/auth').then(m => m.LoginComponent),
        canActivate: [loginGuard],
    },
    {
        path: '',
        loadComponent: () =>
            import('@kyc/layout').then(m => m.LayoutComponent),
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
