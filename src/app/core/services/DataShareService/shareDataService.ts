import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ShareDataService<T = any> {
  private _data: T | null = null;

  set data(value: T) {
    this._data = value;
  }
//T | null
  get data():any  {
    return this._data 
  }

  clear(): void {
    this._data = null;
  }
}





