import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() {
    
    let myUser:IUser = {
      nick:'Pedro',
      subnick: 'Zearkiatos',
      age:30,
      email:'caprilespe@outlook.com',
      friend: true,
      uid:1
    };

    let users:IUser[] = [
      myUser
    ];

    console.log(myUser);

  }

  ngOnInit() {
  }

}
