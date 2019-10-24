import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  public friendId: any;

  public friends: IUser[];

  public friend: IUser;

  price: number = 78.12314235234545;

  today:any = Date.now();
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
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
