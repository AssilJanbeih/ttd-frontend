import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GUID_REGEX } from '../../../core/constants/app-contracts';
import { PROJECTS_ROUTE, PROJECT_ID_PARAM } from '../../../core/constants/routes';
import { ProjectsService } from '../../data-access/projects.service';
import { GetProjectsResponse } from '../../models/project/get-projects-response';
import { CommonModule, DatePipe } from '@angular/common';
import { PieGridModule } from "../../../shared/ui/pie-grid-doughnut/pie-grid.module";
import { TaskListingComponent } from "./task-listing/task-listing.component";

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, PieGridModule, TaskListingComponent],
  providers: [ProjectsService, DatePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  private _subscriptions = new Subscription();
  isSaving: any;
  projectId?: string;
  project!: GetProjectsResponse;
  projectRoute = '/home/' + PROJECTS_ROUTE;


  constructor(private activatedRoute: ActivatedRoute,
    private projectDataService: ProjectsService,
    // private userSessionService: UserSessionService,private sharedService: SharedService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.checkForRouteParams();
  }

  private checkForRouteParams(): void {
    const routeParam = this.activatedRoute.snapshot.params[PROJECT_ID_PARAM];
    const isValidGuid = GUID_REGEX.test(routeParam);
    if (isValidGuid) {
      this.projectId = routeParam;
      this.getProject(routeParam);
    }
  }

  private getProject(id: string) {
    this._subscriptions.add(
      this.projectDataService.getProject(id).subscribe(project => {
        this.project = project;
      }, error => {
        console.error('Error fetching project:', error);
        // Handle the error accordingly
      })
    );
  }
  onUpdateClicked() {
    this.router.navigateByUrl(`home/${PROJECTS_ROUTE}/${this.projectId}`);
  }
}
