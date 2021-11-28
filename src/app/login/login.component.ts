import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private libraryService: LibraryService) {}

  SignIn(username: string, password: string) {
    this.libraryService.SignIn(username, password);
  }

  ngOnInit(): void {}
}
