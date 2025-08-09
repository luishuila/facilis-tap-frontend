import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

type Coords = { lat: number; lon: number };

@Injectable({ providedIn: 'root' })
export class LocationService {
  private coordsSubj = new BehaviorSubject<Coords | null>(null);
  coords$: Observable<Coords | null> = this.coordsSubj.asObservable();
  private watchId?: string;

  async start(): Promise<void> {
    // permisos
    if (Capacitor.isNativePlatform()) {
      const perms = await Geolocation.checkPermissions();
      if (perms.location !== 'granted') {
        const req = await Geolocation.requestPermissions();
        if (req.location !== 'granted') return;
      }
      // posición inicial
      const cur = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      this.push(cur);

      // watch en tiempo real
      this.watchId = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos, err) => { if (!err && pos) this.push(pos); }
      );
    } else if ('geolocation' in navigator) {
      // web fallback
      navigator.geolocation.getCurrentPosition(
        p => this.push(p as unknown as Position),
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
      const id = navigator.geolocation.watchPosition(
        p => this.push(p as unknown as Position),
        () => {},
        { enableHighAccuracy: true }
      );
      this.watchId = `web-${id}`;
    }
  }

  stop(): void {
    if (!this.watchId) return;
    if (this.watchId.startsWith?.('web-')) {
      const idNum = Number(this.watchId.replace('web-', ''));
      navigator.geolocation.clearWatch(idNum);
    } else {
      Geolocation.clearWatch({ id: this.watchId });
    }
    this.watchId = undefined;
  }

  private push(position: Position) {
    this.coordsSubj.next({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  }
}
