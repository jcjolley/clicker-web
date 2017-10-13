import { StateService } from '../state.service';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.styl']
})
export class StateDisplayComponent implements OnInit {
  messages: Observable<any>;
  constructor(private websocketService: WebsocketService,
              private stateService: StateService) { }
  
  ngOnInit() { }

  getKeys() {
    return Object.keys(this.stateService.state);
  }
}
