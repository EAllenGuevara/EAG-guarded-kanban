import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteDialogComponent } from '../../kanban/dialogs/delete-dialog.component';

@Component({
  selector: 'app-delete-btn',
  template: `
    <button
      mat-icon-button
      color="warn"
      (click)="confirmDelete()"
      aria-label="Delete"
    >
      <mat-icon>clear</mat-icon>
    </button>
  `,
  styles: [],
})
/**
 * Opens delete confirmation dialog for tasks and boards
 * and emits delete event to continue with deletion
 */
export class DeleteBtnComponent {
  canDelete: boolean;
  @Input() name: string;
  @Output() delete = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  confirmDelete() {
    this.canDelete = true;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(result);
      }
    });
  }
}
