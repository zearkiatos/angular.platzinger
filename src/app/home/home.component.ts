import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GithubService } from '../services/github-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';
import { Status } from '../enum/statusEnum';
import { RequestStatus } from '../enum/requestStatusEnum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends: IUser[];
  public query: string = '';
  public model: any = {
    username: "",
    password: "",
  }
  public friendEmail: string = '';

  public user: IUser;
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private githubService: GithubService, private modalService: NgbModal,
    private requestService: RequestsService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: IUser) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user.friends);
        }
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });

    this.userService.getUsers().valueChanges().subscribe((data: IUser[]) => {
      this.friends = data;
    },
      (error) => {
        console.log(error);
      });
    this.model.username = "zearkiatos";
    this.model.password = "Zear2123";
    this.githubService.GetUser(this.model.username).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });

  }

  ngOnInit() {
  }

  logOut() {
    this.authenticationService.logOut().then(() => {
      alert("Sessión Cerrada");
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: RequestStatus.Pending
    }

    this.requestService.createRequest(request).then(() => {
      alert("Solicitud Enviada");
    }).catch((error) => {
      alert("Hubo un error");
      console.log(error);
    });
  }

}
