import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  /**
   * Show error when user tries to access a protected route without auth
   */
  authError() {
    this.snackBar.open('You must be logged in!', 'Ok', { duration: 3000 });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap(() => this.router.navigate(['/login'])))
      .subscribe();
  }
}
