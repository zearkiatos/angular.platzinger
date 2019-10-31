import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public model={
    user:{}
  }
  constructor(private userService:UserService, private authenticationService:AuthenticationService) { 
    this.authenticationService.getStatus().subscribe((status)=>{
      this.userService.getUserById(status.uid).valueChanges().subscribe((data:IUser)=>{
        this.model.user = data;
        console.log(this.model.user);
      },(error)=>{
        console.log(error);
      });
    },(error)=>{
      console.log(error);
    });
  }

  ngOnInit() {
  }

  saveSettings(){
    this.userService.editUser(this.model.user).then(()=>{
      alert("Cambios Guardados");
    }).catch((error)=>{
      alert("Hubo un error");
      console.log(error);
    });
  }

}
