import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { MessageType } from '../enum/messageTypeEnum';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

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

  public shake:boolean = false;

  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public picture:any;
  public showCropper:boolean = true;
  public showSendImage:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private conversationService:ConversationService, private authenticationService:AuthenticationService, private firebaseStorage: AngularFireStorage) {
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
      receiver: this.friend.uid,
      type: MessageType.Text
    };
    this.conversationService.createConversation(message).then(()=>{
      this.textMessage = '';
    });
  }

  sendImage(p, conversationId){
    this.showCropper = true;
    this.showSendImage = false;
    const message = {
      uid:conversationId,
      timestamp: Date.now(),
      text: null,
      urlImage:p,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: MessageType.Image
    };
    this.conversationService.sendImage(p, conversationId).then(()=>{
          this.conversationService.createConversation(message).then(()=>{
          });
    }).catch((error)=>{
      alert("Hubo un error al tratar de subir la imagen.");
      console.log(error);
    });
  }

  sendZumbido(){
    const message = {
      uid:this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: MessageType.Zumbido
    };
    this.conversationService.createConversation(message).then(()=>{
    });

    this.doZumbido();
  }

  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;

    window.setTimeout(()=>{
      this.shake = false;
    }, 1000);
  }

  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/'+currentPictureId+'.jpg').putString(this.croppedImage,'data_url');

      pictures.then((data)=>{
        this.picture = this.firebaseStorage.ref("pictures/"+currentPictureId+'.jpg').getDownloadURL();
        this.picture.subscribe((p)=>{
         this.sendImage(p,this.conversationId);
        });
      }).catch((error)=>{
        console.log(error);
      });
    }
    else {
      this.userService.editUser(this.user).then(() => {
        alert("Cambios Guardados");
      }).catch((error) => {
        alert("Hubo un error");
        console.log(error);
      });
    }

  }



  getConversations(){
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe((data)=>{
      this.conversations = data;
      this.conversations.forEach((message) => {
        if(!message.seen){
          message.seen = true;
          this.conversationService.editConversation(message);
          if(message.type == MessageType.Text){
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          }
          else if(message.type == MessageType.Zumbido){
            this.doZumbido();
          }

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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log("Cup");
    this.showCropper = true;
    this.showSendImage = true;
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {

  }
  loadImageFailed() {
    // show message
  }


  

}
