import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./home/feature/home-shell/home-shell.module').then(m => m.HomeShellModule) },
    { path: 'auth', loadChildren: () => import('./login/feature/auth-shell/auth-shell.module').then(m => m.AuthShellModule) },
    //   { path: '404-not-found', loadChildren: () => import('./shared/ui/not-found/not-found.module').then(m => m.NotFoundModule) },

];
