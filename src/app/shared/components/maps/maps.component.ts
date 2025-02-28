import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: false,
})
export class MapsComponent implements OnInit {

  // map!: L.Map;
  isFullscreen: boolean = false;

  ngOnInit() {
    // this.loadMap();
  }

  // loadMap() {
  //   setTimeout(() => {
  //     this.map = L.map('map').setView([6.25184, -75.56359], 13);

  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     }).addTo(this.map);

  //     const customIcon = L.icon({
  //       iconUrl: 'assets/marker-icon.webp',
  //       shadowUrl: 'assets/marker-shadow.webp',
  //       iconSize: [25, 41],
  //       iconAnchor: [12, 41],
  //       popupAnchor: [1, -34],
  //       tooltipAnchor: [16, -28],
  //       shadowSize: [41, 41],
  //     });

  //     L.marker([6.25184, -75.56359], { icon: customIcon })
  //       .addTo(this.map)
  //       .bindPopup('¡Hola desde Medellín!')
  //       .openPopup();

  //     this.map.invalidateSize();
  //   }, 100);
  // }

  // toggleFullscreen() {
  //   this.isFullscreen = !this.isFullscreen;
  //   setTimeout(() => {
  //     this.map.invalidateSize(); // Recalcula el tamaño del mapa
  //   }, 300); // Espera un poco para la animación
  // }
}