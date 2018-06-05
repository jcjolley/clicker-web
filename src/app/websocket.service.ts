import { MessageSpan } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'
import * as Rx from 'rxjs/Rx';

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
  input = new QueueingSubject<string>()
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




  // private subject: Rx.Subject<MessageEvent>

  // public connect(): { emitter: Rx.Subject<MessageEvent>, messages: Rx.Observable<MessageEvent> } {
  //   if (!this.subject) {
  //     this.subject = this.create(this.url);
  //     console.log(`Successfully connected: ${this.url}`)
  //   }

  //   return {
  //     emitter: this.subject,
  //     messages: this.subject.multicast(this.subject)
  //   }
  // }

  // private create(url): Rx.Subject<MessageEvent> {
  //   const ws = new WebSocket(url);

  //   let observable = Rx.Observable.create(
  //     (obs: Rx.Observer<MessageEvent>) => {
  //       ws.onmessage = obs.next.bind(obs);
  //       ws.onerror = obs.error.bind(obs);
  //       ws.onclose = obs.complete.bind(obs);
  //       return ws.close.bind(ws);
  //     });

  //   let observer = {
  //     next: (data: Object) => {
  //       if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify(data));
  //       }
  //     }
  //   }

  //   return Rx.Subject.create(observer, observable);
  // }
}
