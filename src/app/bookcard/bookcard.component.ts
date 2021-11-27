import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookcard',
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css'],
})
export class BookcardComponent implements OnInit {
  constructor() {}

  @Input() book: any = '';

  path: string =
    'https://ravenspacepublishing.org/wp-content/uploads/2019/04/default-book.jpg';

  @Output() selectedBook = new EventEmitter<any>();

  showDetails() {
    this.selectedBook.emit(this.book);
  }

  ngOnInit(): void {
    if (this.book.imageLinks) {
      this.path = this.book.imageLinks.smallThumbnail;
    }
  }
}
