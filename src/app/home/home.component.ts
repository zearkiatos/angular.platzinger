import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GithubService } from '../services/github-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends:IUser[];
  public query:string='';
  public model= {
    username:"",
    password:"",
    user:{}
  }
  constructor(private userService:UserService, private authenticationService:AuthenticationService, private router:Router, private githubService:GithubService) {
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
    
    this.userService.getUsers().valueChanges().subscribe((data:IUser[])=>{
      this.friends = data;
    },
    (error)=>{
      console.log(error);
    });
    this.model.username="zearkiatos";
    this.model.password = "Zear2123";
    this.githubService.GetUser(this.model.username).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });

  }

  ngOnInit() {
  }

  logOut(){
    this.authenticationService.logOut().then(()=>{
      alert("Sessión Cerrada");
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error);
    });
  }

}
