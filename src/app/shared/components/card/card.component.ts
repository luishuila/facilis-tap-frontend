import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent  implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() location: string = '';
  @Input() showInfoIcon: boolean = true;
  @Input() showLocationIcon: boolean = true;
  constructor() { }

  ngOnInit() {}


  onInfoClick() {
    console.log('Información clickeada');
  }

  onLocationClick() {
    console.log('Ubicación clickeada');
  }
}
