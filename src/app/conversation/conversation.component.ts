import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  public friendId: any;
  constructor(private activatedRoute: ActivatedRoute) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
  }

  ngOnInit() {
  }

}
