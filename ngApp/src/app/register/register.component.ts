import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  registerUserData = new User('','');

  constructor(private _auth:AuthService){}

  registerUser(){
    // console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
