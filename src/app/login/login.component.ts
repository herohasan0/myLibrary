import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LibraryService } from '../library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private libraryService: LibraryService) {}
  hide = true;

  SignIn(username: string, password: string) {
    this.libraryService.SignIn(username, password);
  }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get userEmail() {
    return this.userForm.get('email');
  }

  get userPassword() {
    return this.userForm.get('password');
  }

  emailError() {
    if (this.userEmail?.hasError('email')) {
      return 'You should enter a valid email.';
    }
    return 'Email is required.';
  }

  passwordError() {
    if (this.userPassword?.hasError('minlength')) {
      return 'Password must be at least 4 characters long.';
    }
    return 'Password is required.';
  }

  ngOnInit(): void {}
}
