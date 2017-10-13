import { Component, ElementRef, OnInit, PACKAGE_ROOT_URL, ViewChild } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import * as R from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  public messages: Observable<any>
  public emitter: Subject<any>;
  private recieved = [];
  public displayed = [];

  @ViewChild('gatherWood') gatherWoodBtn: ElementRef;
  @ViewChild('mineCopper') mineCopperBtn: ElementRef;
  @ViewChild('repairWall') repairWallBtn: ElementRef;

  constructor(private websocketService: WebsocketService) { };

  ngOnInit(): void {
     const {messages, emitter} = this.websocketService.connect();
     this.messages = messages
      .map((response: MessageEvent): any => {
        console.log('response: ', JSON.stringify(response));
        return response.data;
      })
    
    this.emitter = emitter;
    this.emitter.subscribe(msg => {
      console.log('Emitter snagged: ', msg)
    })

    this.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg)
      const data = JSON.parse(msg);
      this.recieved.push(data);
      this.displayed = this.getDisplayed(this.recieved) as any;
    })

    Observable.fromEvent(this.gatherWoodBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Gathering wood')
      this.gatherWood(); 
      this.gatherWoodBtn.nativeElement.disabled = true;
      setTimeout(() => this.gatherWoodBtn.nativeElement.disabled = false, 2000)
    })

    Observable.fromEvent(this.mineCopperBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Getting copper')
      this.mineCopper(); 
      this.mineCopperBtn.nativeElement.disabled = true;
      setTimeout(() => this.mineCopperBtn.nativeElement.disabled = false, 2000)
    })

    Observable.fromEvent(this.repairWallBtn.nativeElement, 'click').throttleTime(2000).subscribe(x => {
      console.log('Repairing wall')
      this.repairWall(); 
      this.repairWallBtn.nativeElement.disabled = true;
      setTimeout(() => this.repairWallBtn.nativeElement.disabled = false, 2000)
    })
 }

  gatherWood() { this.emitter.next({ user: 'Jolley', action: { type: 'ADD WOOD', payload: '5' } }); }
  mineCopper() { this.emitter.next({ user: 'Jolley', action: { type: 'ADD COPPER', payload: '5' } }); }
  repairWall() { this.emitter.next({ user: 'Jolley', action: { type: 'REPAIR WALL', payload: '5' } }); }

  getDisplayed(recieved) {
    return R.pipe(
      R.filter(R.has('display')),
      R.slice(-7, Infinity),
      R.map(R.prop('msg'))
    )(recieved)
  }
}
