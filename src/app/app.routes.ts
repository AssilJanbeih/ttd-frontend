import { Routes } from '@angular/router';
import { HomeShellModule } from './home/feature/home-shell/home-shell.module';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: '' },
    { path: '', loadChildren: () => import('./home/feature/home-shell/home-shell.module').then(m => m.HomeShellModule)},
        //  , canActivate: [AuthGuard]},
    // { path: 'auth', loadChildren: () => import('./auth/feature/auth-shell/auth-shell.module').then(m => m.AuthShellModule) },
    // { path: '404-not-found', loadChildren: () => import('./shared/ui/not-found/not-found.module').then(m => m.NotFoundModule) },
    // {path: '**', pathMatch: 'full', redirectTo: '/404-not-found'}
];
