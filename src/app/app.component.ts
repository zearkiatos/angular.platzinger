import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { IUser } from './interfaces/IUser';
import { RequestStatus } from './enum/requestStatusEnum';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestComponent } from './components/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platzinger';
  user: IUser;
  requests: any[] = [];
  mailsShown: any[] = [];
  constructor(public router: Router, private authenticationService: AuthenticationService, private userService: UserService, private requestsService: RequestsService,
    private dialogService:DialogService) {

    this.authenticationService.getStatus().subscribe((status) => {

      this.userService.getUserById(status.uid).valueChanges().subscribe((data: IUser) => {
        this.user = data;

        this.requestsService.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {
          this.requests = requests;
          this.requests = this.requests.filter((r) => {
            return r.status !== RequestStatus.Accepted && r.status !== RequestStatus.Rejected;
          });
          this.requests.forEach((r) => {
            if (this.mailsShown.indexOf(r.sender) === -1) {
              this.mailsShown.push(r.sender);
              this.dialogService.addDialog(RequestComponent, {
                scope: this,
                currentRequest: r
              });
            }
          })
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      })

    }, (error) => {
      console.log(error);
    });
  }

}
