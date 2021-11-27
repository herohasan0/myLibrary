import { Component, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  promise: any;
  items: any;
  boookSelected: any;
  routeParams = this.route.snapshot.paramMap;
  userId = String(this.routeParams.get('userId'));

  list: [{ volumeInfo: any }] = [{ volumeInfo: {} }];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
    this.promise = firestore.collection(this.userId).snapshotChanges();
  }

  logSelectedBook(value: string) {
    this.boookSelected = value;
    console.log('main', value);
  }

  xox: any;

  async ngOnInit(): Promise<void> {
    await this.promise.subscribe(async (res: any) => {
      this.items = res;
      console.log('items', this.items);

      this.xox = await this.items.map((item: any) => {
        return { volumeInfo: item.payload.doc.data() };
      });
    });
  }
}
