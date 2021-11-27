import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

import { LibraryService } from '../library.service';

interface Item {}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private libraryService: LibraryService
  ) {}

  list: [{ volumeInfo: any }] = [{ volumeInfo: {} }];

  firstKey: string = 'littleprince';

  boookSelected: any;

  uid: string = '';

  URL: string = '';

  isLogged: boolean = false;

  isLoggedIn() {
    this.afAuth.user.subscribe((res) => {
      if (res?.uid) {
        this.uid = res.uid;
        this.isLogged = true;
        this.URL = `/user/${this.uid}/library`;
        this.router.navigate([`/user/${this.uid}`]);
      }
    });
  }

  logout() {
    this.libraryService.logout();
  }

  logSelectedBook(value: string) {
    this.boookSelected = value;
    console.log('main', value);
  }

  getData(value: string) {
    this.libraryService.getData(value).subscribe((data) => {
      this.list = [...data.items];
    });
  }

  ngOnInit() {
    this.getData(this.firstKey);
    this.isLoggedIn();
  }
}
