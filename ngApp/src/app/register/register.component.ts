import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  registerUserData = new User('','');
  errorMessage: string = ''; // Add error message property

  constructor(private _auth:AuthService,
              private _router:Router){}

  registerUser(){
    // console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special'])
      },
      err => {
        console.log(err);
        if (err.error === 'Email already in use') {
          this.errorMessage = 'Email is already in use';
        } else {
          this.errorMessage = 'Error registering user';
        }
      }
    )
  }
}
