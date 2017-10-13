import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.styl']
})
export class StateDisplayComponent implements OnInit {
  state = {}
  messages: Observable<any>;
  emitter: Subject<any>;
  constructor(private websocketService: WebsocketService) { }
  
  ngOnInit() {
    const {messages, emitter} = this.websocketService.connect();
    this.messages = messages
      .map((response: MessageEvent): any => {
        console.log('response: ', JSON.stringify(response));
        return response.data;
      })

    this.messages.subscribe(response => {
      const {state} = JSON.parse(response);
      if (state && state.materials) {
        this.state = state.materials
      }
    })
  }

  getKeys() {
    return Object.keys(this.state);
  }
}
