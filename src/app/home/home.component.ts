import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() {
    let c:number = 1;
    let b:number = 2;

    let e:string = '1';
    let f:string = '2';
    console.log(e+f);

    let g:boolean = true;
    let h:object = {};

    console.log(g);

    
    let i = [c, b, e, f, g, h];

    console.log(i);

    let j:boolean[] = [true, g];

    let k: object[] = [{},h];

    let l:any[]= [1, 'aoe',{},[]];

  }

  ngOnInit() {
  }

}
