import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import {Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'app';
  public messages: Subject<any>
  constructor(private websocketService: WebsocketService) {};
  private recieved = [];
  public displayed = [];
  ngOnInit(): void {
    this.messages = <Subject<any>>this.websocketService.connect('ws://jcjolley.com:3000')
    .map((response: MessageEvent): any => {
      console.log('response: ', JSON.stringify(response));
      return response.data;
    })

    this.messages.subscribe(msg => {
      this.recieved.push(msg);
      this.displayed = this.recieved.slice(Math.max(this.recieved.length - 7, 0))
      console.log("Response from websocket: " + msg)
    })
  }

  sendMsg() {
    this.messages.next({user: 'Jolley', copperOre: 10});
  }
}
