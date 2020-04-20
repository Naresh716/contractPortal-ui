import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { pathUrl } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private sanckbar: MatSnackBar, private router: Router) { }

  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(50), Validators.minLength(1)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
    displayName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    nickName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    website: new FormControl(''),
    bio: new FormControl(''),
    jabber: new FormControl(''),
    aol_im: new FormControl(''),
    yahoo_im: new FormControl(''),
  });
  verifyPassword() {

  }

  submit(form) {
    let reqObj = {
      userName: form.controls.userName.value,
      email: form.controls.email.value,
      password: form.controls.password.value,
      confirmPassword: form.controls.confirmPassword.value,
      displayName: form.controls.displayName.value,
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
      nickName: form.controls.nickName.value,
      website: form.controls.website.value,
      bio: form.controls.bio.value,
      jabber: form.controls.jabber.value,
      aol_im: form.controls.aol_im.value,
      yahoo_im: form.controls.yahoo_im.value,
    };
    if (reqObj.password == reqObj.confirmPassword) {
      this.http.post(pathUrl + 'api/user/register', reqObj)
        .subscribe((data) => {
          this.router.navigate(['/login']);
        },
          error => {
            this.sanckbar.open(error.error.messsage, 'Error', { duration: 5000 })
          }
        );
    } else {
      this.sanckbar.open("Password and Confirm Password must be same", 'Error', { duration: 5000 });
    }
  }
  ngOnInit() {
  }

}