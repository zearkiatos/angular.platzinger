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

  public conversations:any = [];

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
          this.getConversations();
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

  getConversations(){
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe((data)=>{
      this.conversations = data;
      this.conversations.forEach((message) => {
        if(!message.seen){
          message.seen = true;
          this.conversationService.editConversation(message);
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
        }
      });
      console.log(data);
    },(error)=>{
      console.log(error);
    });
  }

  getUserNickById(id){
    if(id == this.friend.uid){
      return this.friend.nick;
    }
    else{
      return this.user.nick;
    }
  }

  

}
