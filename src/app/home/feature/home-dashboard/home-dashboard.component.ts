import { Component } from '@angular/core';
import { PieGridModule } from "../../../shared/ui/pie-grid-doughnut/pie-grid.module";
import { HomeSummaryRoutingModule } from './home-dashboard-routing.module';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [PieGridModule, HomeSummaryRoutingModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent {

}
