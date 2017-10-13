import { StoreService } from './store.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import { StateDisplayComponent } from './state-display/state-display.component'

@NgModule({
  declarations: [
    AppComponent,
    StateDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WebsocketService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
