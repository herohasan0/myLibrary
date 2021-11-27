import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  @Output() getInput = new EventEmitter<any>();

  value: string = '';

  search(value: string) {
    this.getInput.emit(value);
  }

  ngOnInit(): void {}
}
