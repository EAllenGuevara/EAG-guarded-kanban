import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>Board name</p>
      <mat-form-field>
        <input placeholder="Title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: [],
})
export class BoardDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BoardDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
