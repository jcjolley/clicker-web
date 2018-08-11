import { Component, ElementRef, OnInit, PACKAGE_ROOT_URL, ViewChild } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { pipe, get, filter, map, has, slice } from 'lodash/fp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  public messages: Observable<any>;
  private recieved = [];
  public displayed = [];
  user = 'Jolley';
  @ViewChild('gatherWood') gatherWoodBtn: ElementRef;
  @ViewChild('mineCopper') mineCopperBtn: ElementRef;
  @ViewChild('repairWall') repairWallBtn: ElementRef;

  constructor(private socket: WebsocketService) { }

  ngOnInit(): void {
    this.messages = this.socket.connect();
    this.messages.subscribe(msg => {
      console.log(`Response from websocket: ` + msg);
      const data = JSON.parse(msg);
      this.recieved.push(data);
      this.displayed = this.getDisplayed(this.recieved) as any;
    });

    Observable.fromEvent(this.gatherWoodBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Gathering wood');
      this.gatherWood();
      this.gatherWoodBtn.nativeElement.disabled = true;
      setTimeout(() => this.gatherWoodBtn.nativeElement.disabled = false, 2000);
    });

    Observable.fromEvent(this.mineCopperBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Getting copper');
      this.mineCopper();
      this.mineCopperBtn.nativeElement.disabled = true;
      setTimeout(() => this.mineCopperBtn.nativeElement.disabled = false, 2000);
    });

    Observable.fromEvent(this.repairWallBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Repairing wall');
      this.repairWall();
      this.repairWallBtn.nativeElement.disabled = true;
      setTimeout(() => this.repairWallBtn.nativeElement.disabled = false, 2000);
    });
  }

  gatherWood() {
    this.socket.input.next(JSON.stringify({ user: this.user, action: { type: 'ADD WOOD', payload: 4 + getRandomInt(1, 6) } }));
  }
  mineCopper() {
    this.socket.input.next(JSON.stringify({ user: this.user, action: { type: 'ADD COPPER', payload: 4 + getRandomInt(1, 6) } }));
  }
  repairWall() {
    this.socket.input.next(JSON.stringify({ user: this.user, action: { type: 'REPAIR WALL', payload: 10 } }));
  }

  getDisplayed(recieved) {
    return pipe(
      filter(has('display')),
      slice(-7, Infinity),
      map(get('msg')),
    )(recieved);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
