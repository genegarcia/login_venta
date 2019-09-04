import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../services/authentication.service';
import { UserInterface } from '../models/models-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[ UserService]
})
export class LoginComponent implements OnInit {
    constructor(
      private route: Router,
      private userService: UserService
    ){}
    private user: UserInterface = {
      user: "",
      pass: ""
  };
  ngOnInit(){}

  onLogin(form: NgForm){
    if(form.valid){
      return this.userService
      .loginuser(this.user.user, this.user.pass)
      .subscribe(
        data => {
          console.log(data);
          const token = data.access_token;
          this.userService.setToken(token);
          this.userService.setUser(this.user);
          this.route.navigate(['/home']);
        },
        error => console.log(error)
      );
    }else{
      this.OnisError();
    }
  }
  OnisError(): void{
    alert("error")
  }
}
