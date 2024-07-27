import { Component, forwardRef, OnDestroy, OnInit, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GUID_REGEX } from '../../../core/constants/app-contracts';
import { PROJECT_ID_PARAM, PROJECTS_ROUTE } from '../../../core/constants/routes';
import { ProjectsService } from '../../data-access/projects.service';
import { GetProjectsResponse } from '../../models/project/get-projects-response';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../users/data-access/users.service';

@Component({
  selector: 'app-project-single',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ProjectsService, UsersService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectSingleComponent),
      multi: true
    }
  ],
  templateUrl: './project-single.component.html',
  styleUrl: './project-single.component.scss'
})
export class ProjectSingleComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private _subscriptions = new Subscription();
  isSaving: any;
  projectId?: string;
  isReadOnly!: boolean;
  isInEditMode!: boolean;
  project!: GetProjectsResponse;
  projectFormGroup!: FormGroup;
  projectManagers: any[] = [];
  projectRoute = '/home/' + PROJECTS_ROUTE;

  // isPm = this.userSessionService.isPm;

  value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};


  constructor(private activatedRoute: ActivatedRoute,
    private projectDataService: ProjectsService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.initFormGroup();
    // this.controlDir.valueAccessor = this;

  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.checkForRouteParams();
    this.loadProjectManagers();
  }

  private checkForRouteParams(): void {
    const routeParam = this.activatedRoute.snapshot.params[PROJECT_ID_PARAM];
    const isValidGuid = GUID_REGEX.test(routeParam);
    if (isValidGuid) {
      this.projectId = routeParam;
      this.isInEditMode = true;
      this.isReadOnly = true;
      this.getProject(routeParam);
    }
  }


  initFormGroup(): void {
    this.projectFormGroup = this.formBuilder.group({
      entityId: [null],
      name: [null, [Validators.required]],
      projectManager: [null, [Validators.required]],
      clientEmail: [null, [Validators.required]],
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z09.-]+\\.[a-z]{2,4}$')
      slackLink: [null],
      startDate: [null, [Validators.required]],
      estimatedEndDate: [null, [Validators.required]],
      actualEndDate: [null],
      completion: [null]
    });
  }

    private loadProjectManagers(): void {
      this._subscriptions.add(
        this.userService.getProjectManagers().subscribe(
          managers => this.projectManagers = managers
        )
      );
    }


  private getProject(id: string) {
    this._subscriptions.add(
      this.projectDataService.getProject(id).subscribe(project => {
        this.projectFormGroup.patchValue(project);
        this.project = project;
      })
    );
  //   const mockProject = {entityId: '1', name: 'Project 1', projectManager: 'User 1',
  //     clientEmail: 'client@email.com',
  //     slackLink: 'link.com',
  //     startDate: new Date('07-09-2023'),
  //     estimatedEndDate: new Date('07-09-2024'),
  //     actualEndDate: new Date('07-09-2024'),
  //     completion: 50}
  //     this.projectFormGroup.patchValue(mockProject);
  }

  async submit() {
    console.log(this.projectFormGroup);
    if (this.projectFormGroup.valid) {
      console.log(this.projectFormGroup);
      if (this.isInEditMode) {
        this._subscriptions.add(
          this.projectDataService.updateProject(this.projectFormGroup.value).subscribe({
            complete: () => {
              // this.toastrService
              //   .createNotification({ type: 'success', title: GENERIC_UPDATE_SUCCESS_MESSAGE_TITLE, body: '' }),
              this.router.navigateByUrl(
                this.projectRoute
              );
            }
          }));
      } else {
        this._subscriptions.add(
          this.projectDataService.addProject(this.projectFormGroup.value).subscribe(response => {
            // this.toastrService
            //   .createNotification({ type: 'success', title: GENERIC_CREATE_SUCCESS_MESSAGE_TITLE, body: '' });
            this.router.navigateByUrl(
              this.projectRoute
            );
          }
          )
        );
      }
    }
  }

  onDetailsClicked() {
    this.router.navigateByUrl(`home/${PROJECTS_ROUTE}/view/${this.projectId}`);
  }


  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }


}
