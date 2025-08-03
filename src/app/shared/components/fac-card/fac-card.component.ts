import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fac-card',
  templateUrl: './fac-card.component.html',
  styleUrls: ['./fac-card.component.scss'],
  standalone: false,
})
export class FacCardComponent  implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() distance:any = null;
  @Input() location: string = '';
  @Input() showInfoIcon: boolean = true;
  @Input() showLocationIcon: boolean = true;
  constructor() { }

  ngOnInit() {}


  onInfoClick() {
    console.log('Información clickeada');
  }
  formatDistance(distKm: number | null): string | boolean {

    if(distKm == null){
      return false;
    }
    if (distKm < 1) {
      return `${Math.round(distKm * 1000)} m`;
    }
    return `${distKm.toFixed(1)} km`;
  }
  onLocationClick() {
    console.log('Ubicación clickeada');
  }
}
