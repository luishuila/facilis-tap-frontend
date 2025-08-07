import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class shareDataService {
  private _data: any;

  set data(value: any) {
    this._data = value 
  }

  get data(): any {
    return this._data ?? {
      "categoryId": 1,
      "idProveder": "5",
      "item": {
        "categoryid": 1,
        "categoryname": "Belleza",
        "city": {
          "id": 80,
          "created_at": "2025-08-06T14:37:02.765Z",
          "updated_at": "2025-08-06T14:37:02.765Z",
          "deleted_at": null,
          "cityName": "Abejorral"
        },
        "distance": 6271.806952480858,
        "idprov": "5",
        "imgs": "https://picsum.photos/600/300?random=5",
        "lat": "57.0079",
        "lon": "-40.5648",
        "providertype": "independiente",
        "provname": "Von Inc",
        "servicename": "Tasty Steel Table",
        "subcategorynames": "Barbería"
      },
      "subcategoryId": 3
    }
    ;;
  }
}
