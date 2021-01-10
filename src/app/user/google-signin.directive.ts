import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private angularFireAuth: AngularFireAuth) {}

  // listen on host element
  @HostListener('click')
  onclick() {
    this.angularFireAuth.signInWithPopup(
      new firebase.default.auth.GoogleAuthProvider()
    );
  }
}
