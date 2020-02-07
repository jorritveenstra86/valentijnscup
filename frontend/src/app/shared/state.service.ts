import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // tslint:disable-next-line:variable-name
  private _geselecteerdeCategorieen;

  constructor() {
  }

  get geselecteerdeCategorieen() {
    return this._geselecteerdeCategorieen;
  }

  set geselecteerdeCategorieen(value) {
    this._geselecteerdeCategorieen = value;
  }
}
