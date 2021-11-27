import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private firestore: AngularFirestore,
    public router: Router
  ) {}

  uid: any = '';

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.uid = result.user?.uid;
        console.log('result.user', result.user && result.user.uid);
        this.firestore.collection(this.uid).add({});
        this.router.navigate([`user/${this.uid}`]);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
