import { Component,OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { ChildComponent } from './child/child.component';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  template: `<h1>Route A View Here</h1>
              <app-child-component *ngFor = "let member of members" [childProp]="member"
                (emitter)="select($event)">
              </app-child-component>
                <p [style.color]="membServ.selected ? 'black' : 'lightgray'">current selection: {{membServ.selected | json}}</p>`,
  styleUrls: ['route_a.component.css']
  })
export class RouteAComponent implements OnInit   {

  members: Member[] = [];

  
  select(memb: Member) {
    this.router.navigate(['routeB', memb.id]);
  }
  
  constructor(private membServ: MemberService, private router: Router){}
  

  
  ngOnInit() {
        
    firebase.database().ref('members').on('value', (snapshot) => {
      let objs =snapshot.val();
      for (var prop in objs) {this.members.push(objs[prop]);};
    });
    
  }
  
  
}
