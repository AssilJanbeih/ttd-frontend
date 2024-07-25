import { Component } from '@angular/core';
import { HomeDashboardComponent } from "../home-dashboard/home-dashboard.component";
import { USERS_ROUTE, PROJECTS_ROUTE, DASHBOARD_ROUTE } from '../../../core/constants/routes';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [HomeDashboardComponent, RouterLink, RouterOutlet],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.scss'
})
export class HomeNavComponent {
  homeRoute = '/home/'
  dashboardRoute = this.homeRoute + DASHBOARD_ROUTE;
  userRoute = this.homeRoute + USERS_ROUTE;
  projectRoute = this.homeRoute + PROJECTS_ROUTE;

}
