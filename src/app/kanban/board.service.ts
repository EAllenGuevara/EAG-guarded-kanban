import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  /**
   * Create new board for current user
   * @param {Board} data
   */
  async createBoard(data: Board) {
    const user = await this.angularFireAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Default description', label: 'blue-a' }], //set default values
    });
  }

  /**
   * Get users boards from db ordered by priority
   */
  getUserBoards() {
    return this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              // get boards by uid and order by priority
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' }); //emit idField on change
        } else {
          // user not logged in
          return [];
        }
      })
    );
  }

  /**
   * Update tasks
   * @param {string} boardId
   * @param {Task[]} tasks
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Remove individual tasks
   * @param {string} boardId
   * @param {Task} task
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.default.firestore.FieldValue.arrayRemove(task), //let firebase handle finding task and removal
      });
  }

  /**
   * Batch update of boards when sorted(changing priority)
   * @param {Board []} boards
   */
  sortBoards(boards: Board[]) {
    const db = firebase.default.firestore();
    const batch = db.batch();
    // create an array of refs for the boards ids
    const refs = boards.map((board) => db.collection('boards').doc(board.id));
    refs.forEach(
      // update priority for each board
      (ref, index) => batch.update(ref, { priority: index })
    );
    // commit changes once batch is complete
    batch.commit();
  }

  /**
   * Delete board
   * @param {string} boardId
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }
}
