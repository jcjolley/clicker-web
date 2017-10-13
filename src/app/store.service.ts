import { Injectable } from '@angular/core';
import reducer from './reducers/index';
import { createStore } from 'redux';

@Injectable()
export class StoreService {

  public store = createStore(reducer);
  constructor() {}
  
}
