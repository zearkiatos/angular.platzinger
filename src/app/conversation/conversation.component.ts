import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  public friendId: any;

  public friend: IUser;

  public user:IUser;

  public conversationId:string;

  public textMessage:string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private conversationService:ConversationService, private authenticationService:AuthenticationService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);

    this.authenticationService.getStatus().subscribe((session)=>{
      this.userService.getUserById(session.uid).valueChanges().subscribe((user:IUser)=>{
        this.user = user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: IUser) => {
          console.log(data);
          this.friend = data;
          const ids = [this.user.uid,this.friend.uid].sort();
          this.conversationId = ids.join('|');
        }, (error) => {
          console.log(error);
        });
      },(error)=>{
        console.log(error);
      });
    });
  }

  ngOnInit() {
  }

  sendMessage(){
    const message = {
      uid:this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then(()=>{
      this.textMessage = '';
    });
  }

}
