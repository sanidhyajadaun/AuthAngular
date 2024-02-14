import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  registerUserData = new User('','')
  registerUser(){
    console.log(this.registerUserData);
  }
}
