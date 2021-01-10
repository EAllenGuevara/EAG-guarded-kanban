import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>Confirm deletion</h1>
    <div mat-dialog-content>
      <p>Delete {{ data.name }}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-button
        color="warn"
        [mat-dialog-close]="data.name"
        cdkFocusInitial
      >
        Ok
      </button>
    </div>
  `,
  styles: [],
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
