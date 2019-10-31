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

  public friend: IUser;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);

    this.userService.getUserById(this.friendId).valueChanges().subscribe((data: IUser) => {
      console.log(data);
      this.friend = data;
    }, (error) => {
      console.log(error);
    });


    console.log(this.friend);
  }

  ngOnInit() {
  }

}
