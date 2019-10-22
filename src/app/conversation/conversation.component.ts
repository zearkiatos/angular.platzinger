import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  public friendId: any;

  public friends: IUser[];

  public friend: IUser;
  constructor(private activatedRoute: ActivatedRoute, private userService:UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.friends = this.userService.getFriends();
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
    });

    console.log(this.friend);
  }

  ngOnInit() {
  }

}
