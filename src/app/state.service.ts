import { Observable } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  state = {};
  messages: Observable<any>
  constructor(private socket: WebsocketService) {

      this.messages = this.socket.connect()
      this.messages.subscribe(response => {

      const {state} = JSON.parse(response);
      if (state && state.materials) {
        this.state = state.materials
      }
    })

   }

      
    
}
