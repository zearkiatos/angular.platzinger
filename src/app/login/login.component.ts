import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import { Router } from '@angular/router';
import { Status } from '../enum/statusEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public operation: string = "login";
  public model = {
    email: "",
    password: "",
    nick:""
  }
  constructor(private authenticationService: AuthenticationService, private userService:UserService, private router:Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.model.email, this.model.password).then((data) => {
      alert("Loggeado correctamente");
      this.router.navigate(['home']);
      console.log(data);
    }).catch((error) => {
      alert("Ocurrio un error");
      console.log(error);
    });
  }

  loginWithFacebook() {
    this.authenticationService.loginWithFacebook().then((data)=>{
      alert("Loggeado correctamente");
      this.router.navigate(['home']);
      console.log(data);
    }).catch((error)=>{
      alert("Ocurrio un error");
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.model.email, this.model.password).then((data) => {
      const user:IUser={
        uid:data.user.uid,
        email: this.model.email,
        nick: this.model.nick,
        status: Status.Online
      };

      this.userService.createUser(user).then((response)=>{
        alert("Registrado correctamente");
        console.log(data);
      }).catch((error)=>{
        alert("Ocurrio un error");
        console.log(error);
      });

    }).catch((error) => {
      alert("Ocurrio un error");
      console.log(error);
    });
  }

}
