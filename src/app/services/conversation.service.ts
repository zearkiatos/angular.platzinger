import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) { 

  }

  createConversation(conversation:any){
    return this.angularFireDatabase.object('conversations/'+conversation.uid+'/'+conversation.timestamp).set(conversation);
  }

  getConversation(uid){
    return this.angularFireDatabase.list('conversations/'+uid);
  }

  editConversation(conversation:any){
    return this.angularFireDatabase.object('conversations/'+conversation.uid+'/'+conversation.timestamp).set(conversation);
  }

  sendImage(image:string,conversationId:string){
    return this.angularFireDatabase.object('/conversations/'+conversationId+'/image').set(image);
  }
}
