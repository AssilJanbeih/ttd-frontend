import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleComponent } from './project-single.component';

describe('ProjectSingleComponent', () => {
  let component: ProjectSingleComponent;
  let fixture: ComponentFixture<ProjectSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
