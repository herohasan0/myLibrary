import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {}

  uid: any = '';

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.uid = result.user?.uid;
        this.router.navigate([`user/${this.uid}`]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logger(username: string, password: string) {
    console.log('username', username, 'password', password);
  }

  //////////

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageForPass() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('minLength')) {
      return 'You must enter ten character at least';
    }
    return this.password.hasError('password') ? 'Deneem' : 'Hasan';
  }

  //////////

  ngOnInit(): void {}
}
