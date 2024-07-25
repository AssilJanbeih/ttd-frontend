import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PROJECT_ID_PARAM } from "../../../core/constants/routes";
import { ProjectSingleComponent } from "../project-single/project-single.component";
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { ProjectListingComponent } from "../project-listing/project-listing.component";

const routes: Routes = [
  {
    
    path: '',
    component: ProjectListingComponent,
    data: {
      breadcrumb: 'Projects'
    }
  },
  {
    path: 'new',
    component: ProjectSingleComponent,
    data: {
      breadcrumb: 'New Project'
    }
  },
  {
    path: `:${PROJECT_ID_PARAM}`,
    component: ProjectSingleComponent,
    data: {
      breadcrumb: 'Project'
    }
  },
  {
    path: 'view/' + `:${PROJECT_ID_PARAM}`,
    component: ProjectDetailsComponent,
    data: {
      breadcrumb: 'Project Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsShellRoutingModule {
}
