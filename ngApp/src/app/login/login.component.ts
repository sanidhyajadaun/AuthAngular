import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginUserData = {email: '', password: ''};

    constructor(private _auth:AuthService,
                private _router:Router){}
    loginUser(){
      // console.log(this.loginUserData);
      this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          this._router.navigate(['/special'])
        },
        err => console.log(err)
      )
    }
}
