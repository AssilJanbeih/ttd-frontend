import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { PROJECTS_ROUTE } from '../../../../core/constants/routes';
import { ProjectsService } from '../../../data-access/projects.service';
import { GetProjectsResponse } from '../../../models/project/get-projects-response';
import { GetTasksResponse } from '../../../models/task/get-task-response';
import { TasksService } from '../../../data-access/task/tasks.service';
import { TaskSingleComponent } from './task-single/task-single.component';
import { UpdatTaskRequest } from '../../../models/task/update-task-request';

@Component({
  selector: 'app-task-listing',
  standalone: true,
  imports: [CommonModule, DatePipe, TaskSingleComponent],
  providers:[TasksService],
  templateUrl: './task-listing.component.html',
  styleUrl: './task-listing.component.scss'
})
export class TaskListingComponent {
  showModal: boolean = false;
  selectedTask: UpdatTaskRequest | null = null;

  projectId!: string
  @Input('projectId') public set setProjectId(id: string | undefined){
    if (id){
      this.projectId = id;
      this.getTasks(id);
    }
  };
  private _subscriptions = new Subscription();
  listOfdata$!: Observable<Array<GetTasksResponse>>;
  // isPm = this.userSessionService.isPm;

  constructor(
    // private modalService: ModalService,
    private projectTaskService: TasksService, 
    // private userSessionService: UserSessionService
  ) { }

  ngOnInit(): void {

    // this.listOfdata$ = this.getStaticTasks();
  }

  // private getStaticTasks(): Observable<Array<GetTasksResponse>> {
  //   const staticTasks: Array<GetTasksResponse> = [
  //     {entityId: '1', name: 'Task 1', projectId: 'Project 1', priority: 'High', assignee: 'User 2', status: 'Done', startDate: new Date('2024-07-30'), 
  //       estimatedEndDate: new Date('2024-08-15'), actualEndDate: new Date('2024-08-15'),  createdOn: new Date('2024-06-26')},
  //       {entityId: '2', name: 'Task 2', projectId: 'Project 1', priority: 'Low', assignee: 'User 1', status: 'Pending', startDate: new Date('2024-07-30'), 
  //         estimatedEndDate: new Date('2024-08-15'), actualEndDate: new Date('2024-08-15'),  createdOn: new Date('2024-06-26')}
  //   ];
  //   return of(staticTasks);
  // }
  onAddClicked() {
    this.selectedTask = null; // Set to null for adding a new task
    this.showModal = true;
    // const ref = this.modalService.create({
    //   nzDirection: this.modalDirection,
    //   nzContent: ProjectsTaskEditModalComponent,
    //   nzData: {
    //     projectId: this.projectId,
    //   },
    // });
    // this._subscriptions.add(
    //   ref.afterClose.subscribe((refresh: boolean) => {
    //     if (refresh){
    //       this.getTasks(this.projectId);
    //     }
    //   })
    // );
  }

  onCloseModal(): void {
    this.showModal = false; // Close the modal
  }

  onEditClicked(entityId: string) {
    // const ref = this.modalService.create({
    //   nzDirection: this.modalDirection,
    //   nzContent: ProjectsTaskEditModalComponent ,
    //   nzData: {
    //     projectId: this.projectId,
    //     entityId: entityId,
    //   },
    // });
    // this._subscriptions.add(
    //   ref.afterClose.subscribe((refresh: boolean) => {
    //     if (refresh){
    //       this.getTasks(this.projectId);
    //     }
    //   })
    // );
  }

onDeleteClicked(id: string) {
    this._subscriptions.add(
      this.projectTaskService.deleteTask({entitiesId: [id]}).subscribe(
        {complete: () => this.getTasks(this.projectId)}
      )
    );
  }


  private getTasks(projectId: string) {
    this.listOfdata$ = this.projectTaskService.getTask(projectId);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
