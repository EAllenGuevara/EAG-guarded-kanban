import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
          required
        >
        </textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let option of labelOptions" [value]="option">
          <mat-icon [ngClass]="option">{{
            option === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button
        mat-button
        [mat-dialog-close]="data"
        cdkFocusInitial
        disabled="{{ data.task.description === '' }}"
      >
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>
    </div>
  `,
  styleUrls: ['./task-dialog.component.scss'],
})
/**
 * Create and update task dialog
 */
export class TaskDialogComponent {
  // corresponding CSS classes found in task-dialog.component.scss and board.component.scss
  labelOptions = ['blue-a', 'blue-b', 'blue-c', 'blue-d', 'blue-e', 'gray'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
