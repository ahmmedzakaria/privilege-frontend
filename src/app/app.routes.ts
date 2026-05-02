import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth/auth.guard';
import { loginGuard } from './core/services/auth/login.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [loginGuard],
    },
    {
        path: '',
        loadComponent: () =>
            import('./core/layout/layout/layout.component').then(m => m.LayoutComponent),
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
