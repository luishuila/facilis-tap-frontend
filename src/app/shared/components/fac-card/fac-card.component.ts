import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fac-card',
  templateUrl: './fac-card.component.html',
  styleUrls: ['./fac-card.component.scss'],
  standalone: false,
})
export class FacCardComponent implements OnInit {
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() description = '';
  @Input() distance: number | null = null;
  @Input() location = '';
  @Input() showInfoIcon = true;
  @Input() showLocationIcon = true;

  @Output() eventCard = new EventEmitter<any>();
  @Output() infoClick = new EventEmitter<void>();

  imageLoaded = false;

  ngOnInit() {}

  onInfoClick(ev: Event) {
    ev.stopPropagation(); // evita disparar onLocationClick
    this.infoClick.emit();
  }

  formatDistance(distKm: number | null): string | false {
    if (distKm == null || isNaN(+distKm)) return false;
    if (distKm < 1) return `${Math.round(distKm * 1000)} m`;
    return `${(+distKm).toFixed(1)} km`;
  }

  onLocationClick() {
    this.eventCard.emit({ action: 'open-location' });
  }
}
