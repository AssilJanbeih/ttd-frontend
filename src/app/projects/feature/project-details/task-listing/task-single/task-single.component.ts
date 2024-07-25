import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-single',
  standalone: true,
  imports: [],
  templateUrl: './task-single.component.html',
  styleUrl: './task-single.component.scss'
})
export class TaskSingleComponent {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();

  onSubmit(): void {
    // Handle form submission logic
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }
}
