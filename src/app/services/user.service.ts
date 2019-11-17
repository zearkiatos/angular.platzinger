import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Status } from '../enum/statusEnum';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private friends: IUser[];
  constructor(private angularFireDatabase: AngularFireDatabase) {

  }

  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user: IUser) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user: IUser) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  setAvatar(avatar: string, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }

  addFriend(userId, friendId) {
    this.angularFireDatabase.object('users/'+userId+'/friends/'+friendId).set(friendId);
    return this.angularFireDatabase.object('users/'+friendId+'/friends/'+userId).set(userId);
  }


}
