import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(
    private http: HttpClient,
    public router: Router,
    public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar
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
}
