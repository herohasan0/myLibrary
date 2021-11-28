import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private libraryService: LibraryService) {}

  SignUp(username: string, password: string) {
    this.libraryService.SignUp(username, password);
  }

  ngOnInit(): void {}
}
