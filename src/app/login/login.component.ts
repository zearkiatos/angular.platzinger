import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public operation: string = "login";
  public model = {
    email: "",
    password: ""
  }
  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.model.email, this.model.password).then((data) => {
      alert("Loggeado correctamente");
      console.log(data);
    }).catch((error) => {
      alert("Ocurrio un error");
      console.log(error);
    });
  }

  loginWithFacebook() {
    this.authenticationService.loginWithFacebook().then((data)=>{
      alert("Loggeado correctamente");
      console.log(data);
    }).catch((error)=>{
      alert("Ocurrio un error");
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.model.email, this.model.password).then((data) => {
      alert("Registrado correctamente");
      console.log(data);
    }).catch((error) => {
      alert("Ocurrio un error");
      console.log(error);
    });
  }

}
