import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(
    private http: HttpClient,
    public router: Router,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  list: [{ volumeInfo: any }] = [{ volumeInfo: {} }];

  getData(searchKey: string) {
    return this.http.get<{
      items: [
        {
          volumeInfo: {
            title: string;
            authors: string[];
            imageLinks: { smallThumbnail: string };
          };
        }
      ];
    }>(
      `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&AIzaSyBne_zN_nJIat18JP0AcYgChLP0P5ypt1k`
    );
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  uid: any = '';

  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.uid = result.user?.uid;
      this.router.navigate([`user/${this.uid}`]);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.uid = result.user?.uid;
      console.log('result.user', result.user && result.user.uid);
      this.firestore.collection(this.uid).add({});
      this.router.navigate([`user/${this.uid}`]);
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
