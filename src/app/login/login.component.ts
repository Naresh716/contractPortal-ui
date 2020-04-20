import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pathUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { MatCardActions, MatCardContent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private commonService: CommonService, private router: Router, private elementRef: ElementRef) { }

  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    password: new FormControl('', Validators.required)
  });

  submit(form) {
    console.log(form.controls);
    let user = {
      'userName': form.controls.userName.value,
      'password': form.controls.password.value
    }
    this.http.post(pathUrl + 'api/auth/authenticate', user)
      .subscribe((data) => {
        this.commonService.setUser(data['token']);
        this.router.navigate(['/dashboard']);
      },
        error => {
          this.snackbar.open(error.error.message);
        }
      );
  }
  ngOnInit() {
  }

}
