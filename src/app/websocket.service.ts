import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  private url
  constructor() {
    if (environment.production) {
      this.url = 'ws://jcjolley.com:3000';
    } else {
      this.url = 'ws://localhost:3000';
    }
  }
  private subject: Rx.Subject<MessageEvent>

  public connect(): { emitter: Rx.Subject<MessageEvent>, messages: Rx.Observable<MessageEvent> } {
    if (!this.subject) {
      this.subject = this.create(this.url);
      console.log(`Successfully connected: ${this.url}`)
    }

    return {
      emitter: this.subject,
      messages: this.subject.multicast(this.subject)
    }
  }

  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }

    return Rx.Subject.create(observer, observable);
  }
}
