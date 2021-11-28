import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  hide = true;

  @Input() type: string = '';
  @Input() func: any;
  @Input() route: string = '';

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
