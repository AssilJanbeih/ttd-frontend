import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UserListingComponent } from '../user-listing/user-listing.component';
import { UserSingleComponent } from '../user-single/user-single.component';

const routes: Routes = [
  {
    path: '', 
    component: UserListingComponent,
     data: {
    }, 
  },
  {
    path: 'new', 
    component: UserSingleComponent, 
    data: {
      breadcrumb: 'User'
    }, 
  },
  // {
  //   path: ':userId', 
  //   component: ,
  //   data: {
  //     breadcrumb: 'User'
  //   }, 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersShellRoutingModule { }
