import { StateService } from './state.service';
import { StoreService } from './store.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    WebsocketService,
    StoreService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
