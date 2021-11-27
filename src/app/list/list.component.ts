import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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
  xxxx: any;
  items: any;
  routeParams = this.route.snapshot.paramMap;
  logg = String(this.routeParams.get('userId'));

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
    this.items = firestore.collection(this.logg).snapshotChanges();
  }

  @Output() selectedBook = new EventEmitter<any>();

  log() {
    this.items.subscribe((res: any) => {
      this.xxxx = res;
      console.log(res[0].payload.doc.data());
    });
  }

  loggerBook(value: string) {
    this.selectedBook.emit(value);
  }

  loggerxox() {
    console.log('list1111', this.list);
  }

  @Input() list: any;
}
