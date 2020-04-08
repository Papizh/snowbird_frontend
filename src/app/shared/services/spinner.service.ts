import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  state = false;
  constructor() { }

  show() {
    setTimeout( () => this.state = true, 0 );
  }

  hide() {
    setTimeout( () => this.state = false, 500 );
  }
}
