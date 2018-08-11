import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';

@Injectable()
export class WebsocketService {
  private url;
  constructor() {
    if (location.href.includes('localhost')) {
      this.url = 'ws://localhost:3000';
    } else {
      this.url = 'ws://jcjolley.com:3000';
    }
  }

  // this subject queues as necessary to ensure every message is delivered
  input = new QueueingSubject<string>();
  messages;
  connectionStatus;
  // this method returns an object which contains two observables
  public connect() {
    if (!this.messages) {
      const { messages, connectionStatus } = websocketConnect(this.url, this.input)
      this.messages = messages.share();
      this.connectionStatus = connectionStatus;
    }
    return this.messages;
  }
}
