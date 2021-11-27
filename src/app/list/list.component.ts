import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Item {
  books: {
    title: string;
  };
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
    this.items = firestore.collection(this.userID).snapshotChanges();
  }

  items: any;
  routeParams = this.route.snapshot.paramMap;
  userID = String(this.routeParams.get('userId'));

  @Input() list: any;
  @Output() selectedBook = new EventEmitter<any>();

  selectBook(value: string) {
    this.selectedBook.emit(value);
  }
}
