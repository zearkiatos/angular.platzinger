import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public friends:IUser[];
  constructor(private userService:UserService) {

    this.friends = this.userService.getFriends();

  }

  ngOnInit() {
  }

}
