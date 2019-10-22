import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends:IUser[];
  public query:string='';
  constructor(private userService:UserService) {

    this.friends = this.userService.getFriends();

  }

  ngOnInit() {
  }

}
