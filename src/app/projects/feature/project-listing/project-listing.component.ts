import { Component, OnInit } from "@angular/core"
import { ProjectListingRoutingModule } from "./project-listing-routing.module";
import { CommonModule, DatePipe } from "@angular/common";
import { PROJECTS_ROUTE } from "../../../core/constants/routes";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { GetProjectsResponse } from "../../models/project/get-projects-response";
import { ProjectsService } from "../../data-access/projects.service";

@Component({
  selector: 'app-project-listing',
  standalone: true,
  imports: [ CommonModule ,ProjectListingRoutingModule],
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss'],
  providers:[ProjectsService, DatePipe],
})
export class ProjectListingComponent implements OnInit {
  private _subscriptions = new Subscription();
  listOfData$!: Observable<Array<GetProjectsResponse>>;

  constructor(
    private router: Router,
    private projectDataService: ProjectsService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getProjectsListing();
  }
  onAddClicked() {
    this.router.navigateByUrl(`home/${PROJECTS_ROUTE}/new`);
  }

  private getProjectsListing() {
    this.listOfData$ = this.projectDataService.getProjects();
  }

  onUpdateClicked(id: string) {
    this.router.navigateByUrl(`home/${PROJECTS_ROUTE}/${id}`);
  }

  onDeleteClicked(id: string) {
    this.projectDataService.deleteProject(id);
  }

  onDetailsClicked(id: string) {
    this.router.navigateByUrl(`home/${PROJECTS_ROUTE}/view/${id}`);
  }
}
