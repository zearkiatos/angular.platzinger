import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  public friendId: any;

  public friends: IUser[];

  public friend: IUser;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);

    let user1: IUser = {
      nick: 'Pedro',
      subnick: 'Pedro',
      age: 60,
      email: 'pedro@outlook.com',
      friend: false,
      uid: 1
    };

    let user2: IUser = {
      nick: 'Roberto',
      subnick: 'Roberto',
      age: 30,
      email: 'roberto@outlook.com',
      friend: true,
      uid: 2
    };

    let user3: IUser = {
      nick: 'Yessenia',
      subnick: 'Yessenia',
      age: 33,
      email: 'Yessenia@outlook.com',
      friend: false,
      uid: 3
    };

    let user4: IUser = {
      nick: 'Maria',
      subnick: 'Maria',
      age: 30,
      email: 'maria@outlook.com',
      friend: true,
      uid: 4
    };

    let user5: IUser = {
      nick: 'Diana',
      subnick: 'Diana',
      age: 12,
      email: 'diana@outlook.com',
      friend: false,
      uid: 5
    };


    this.friends = [user1, user2, user3, user4, user5];

    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
    });

    console.log(this.friend);
  }

  ngOnInit() {
  }

}
