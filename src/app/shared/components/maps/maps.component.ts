import { Component, OnInit } from '@angular/core';
import { map, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: false,
})
export class MapsComponent implements OnInit {
  map!: L.Map;
  isFullscreen: boolean = false;

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    setTimeout(() => {
      this.map = map('map', {
        center: [6.25184, -75.56359],
        zoom: 13
      });

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      const customIcon = icon({
        iconUrl: 'assets/marker-icon.webp',
        shadowUrl: 'assets/marker-shadow.webp',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      marker([6.25184, -75.56359], { icon: customIcon })
        .addTo(this.map)
        .bindPopup('¡Hola desde Medellín!')
        .openPopup();

      setTimeout(() => {
        this.map.invalidateSize();
      }, 300);
    }, 100);
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);
  }
}
