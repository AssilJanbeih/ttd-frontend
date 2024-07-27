import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/data-access/auth.service';
import { UsersService } from '../../data-access/users.service';
import { CommonModule } from '@angular/common';
import { JobType } from '../../../shared/models/job-types';
import { SharedService } from '../../../shared/data-access/shared.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss'],
  providers: [UsersService, AuthService, SharedService],
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, FormsModule],
})
export class UserSingleComponent implements OnInit {
  userFormGroup: FormGroup;
  jobTypes: JobType[] = [];
  isInEditMode = false; // Or determine if in edit mode based on route params or other logic

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.userFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      jobType: [null, Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobTypes();
  }

  loadJobTypes(): void {
    this.sharedService.getJobTypes().subscribe({
      next: (data: JobType[]) => this.jobTypes = data,
      error: (err) => console.error('Failed to load job types', err)
    });
  }

  onSubmit(): void {
    if (this.userFormGroup.valid) {
      const userData = this.userFormGroup.value;
      if (this.isInEditMode) {
        //
      } else {
        this.authService.register(userData).subscribe({
          next: () => this.router.navigate(['home/users']),
          error: (err) => console.error('Failed to create user', err)
        });
      }
    }
  }
}
