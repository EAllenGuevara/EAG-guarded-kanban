import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: any;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, index?: number): void {
    const newTask = { description: 'Default description', label: 'blue-a' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      // handle creation or editing
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board, index }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.isNew) {
        this.boardService.updateTasks(this.board.id, [
          ...this.board.tasks,
          result.task,
        ]);
      } else {
        const update = this.board.tasks;
        update.splice(result.index, 1, result.task);
        this.boardService.updateTasks(this.board.id, this.board.tasks);
      }
    });
  }

  // called from delete event from delete-btn.component
  handleDeleteTask(task: Task) {
    this.boardService.removeTask(this.board.id, task);
  }

  handleDeleteBoard() {
    this.boardService.deleteBoard(this.board.id);
  }
}
