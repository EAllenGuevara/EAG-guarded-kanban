import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private snack: SnackService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.angularFireAuth.currentUser;
    const isLoggedIn = !!user;
    // show snackbar for login error
    if (!isLoggedIn) this.snack.authError();
    return isLoggedIn;
  }
}
