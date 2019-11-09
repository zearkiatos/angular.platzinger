import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { PromptModel } from 'src/app/interfaces/IPromptModel';
import { RequestsService } from 'src/app/services/requests.service';
import { RequestStatus } from 'src/app/enum/requestStatusEnum';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  shouldAdd: string = 'yes';
  currentRequest: any;

  constructor(public dialogService: DialogService, private userService: UserService, private requestsService: RequestsService) {
    super(dialogService);
  }

  accept() {
    if (this.shouldAdd == 'no') {
      this.requestsService.setRequestStatus(this.currentRequest, RequestStatus.Accepted).then((data) => {
        this.userService.addFriend(this.scope.user.uid,this.currentRequest.sender).then((data)=>{
          alert('Solicitud Aceptada con éxito.');
        });
      }).catch((error) => {
        console.log(error);
      });
    }
    else if (this.shouldAdd == 'later') {
      this.requestsService.setRequestStatus(this.currentRequest, RequestStatus.Later).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}
