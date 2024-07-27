import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_ROUTE, PROJECTS_ROUTE, USERS_ROUTE } from '../../../core/constants/routes';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { HomeDashboardComponent } from '../home-dashboard/home-dashboard.component';
import { ProjectsShellRoutingModule } from '../../../projects/feature/projects-shell/projects-shell-routing.module';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeNavComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: DASHBOARD_ROUTE },
      {
        path: DASHBOARD_ROUTE,
        component: HomeDashboardComponent,
        canActivate: [AuthGuard] 
      }, {
        path: PROJECTS_ROUTE,
        loadChildren: () => import('../../../projects/feature/projects-shell/projects-shell.module').then(m => m.ProjectsShellModule),
        canActivate: [AuthGuard] 
      },
      {
        path: USERS_ROUTE,
        loadChildren: () => import('../../../users/feature/users-shell/users-shell.module').then(m => m.UsersShellModule),
        canActivate: [AuthGuard] 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeShellRoutingModule { }
