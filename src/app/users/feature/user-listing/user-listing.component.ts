import { Component } from '@angular/core';
import { USERS_ROUTE } from '../../../core/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProjectsService } from '../../../projects/data-access/projects.service';
import { CommonModule, DatePipe } from '@angular/common';
import { GetUsersResponse } from '../../models/get-users/get-users-response';
import { UsersService } from '../../data-access/users.service';

@Component({
  selector: 'app-user-listing',
  standalone: true,
  imports: [CommonModule],
  providers:[UsersService],
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.scss'
})
export class UserListingComponent {
  private _subscriptions = new Subscription();
  listOfData$!: Observable<Array<GetUsersResponse>>;

  constructor(
    private router: Router,
    private usertDataService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getProjectsListing();
  }
  onAddClicked() {
    this.router.navigateByUrl(`home/${USERS_ROUTE}/new`);
  }

  private getProjectsListing() {
    this.listOfData$ = this.usertDataService.getUsers();
  }

  onUpdateClicked(id: string) {
    this.router.navigateByUrl(`home/${USERS_ROUTE}/${id}`);
  }


  onDetailsClicked(id: string) {
    this.router.navigateByUrl(`home/${USERS_ROUTE}/view/${id}`);
  }

}
