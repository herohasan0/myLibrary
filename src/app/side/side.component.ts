import { Component, Input, OnInit, SimpleChange } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent implements OnInit {
  routeParams = this.route.snapshot.paramMap;
  userID = this.routeParams.get('userId');

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  @Input() selectedBook: any;

  path: string = '';
  loading: boolean = false;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  addBook() {
    this.loading = true;
    this.firestore
      .collection(String(this.userID))
      .add(this.selectedBook)
      .then(() => {
        this.loading = false;
        this.openSnackBar(this.selectedBook.title, 'added');
      })
      .catch(() => {
        this.loading = false;
        this.openSnackBar('Something went wrong!', 'Try again!');
      });
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.selectedBook && this.selectedBook.imageLinks) {
      this.path = this.selectedBook.imageLinks.smallThumbnail;
    } else {
      this.path =
        'https://ravenspacepublishing.org/wp-content/uploads/2019/04/default-book.jpg';
    }
  }

  ngOnInit(): void {}
}
