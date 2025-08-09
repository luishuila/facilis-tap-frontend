import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { App } from '@capacitor/app';

@Injectable({ providedIn: 'root' })
export class GalleryPermissionsService {

  /** Llama esto para abrir la galería y devolver File + webPath */
  async pickOneFromGallery(): Promise<{ file: File; webPath: string }> {
    await this.ensureGalleryPermission();

    const result = await Camera.pickImages({
      quality: 85,
      limit: 1,
      presentationStyle: 'popover', // iOS
    });

    const photo = result.photos?.[0];
    if (!photo?.webPath) throw new Error('No se seleccionó imagen');

    const file = await this.webPathToFile(photo.webPath, photo.path ?? 'avatar.jpg');
    return { file, webPath: photo.webPath };
  }

  /** Verifica y solicita permisos para la librería de fotos */
  private async ensureGalleryPermission(): Promise<void> {
    const status = await Camera.checkPermissions(); // { camera, photos }
    if (status.photos === 'granted' || status.photos === 'limited') return;

    const req = await Camera.requestPermissions({ permissions: ['photos'] });
    if (req.photos !== 'granted' && req.photos !== 'limited') {
      // usuario negó o marcó "no volver a preguntar"
    //   await App.openSettings();
      throw new Error('Permiso de fotos no concedido');
    }
  }

  /** Convierte una webPath (Capacitor) a File para subir al backend */
  private async webPathToFile(webPath: string, filename = 'image.jpg'): Promise<File> {
    const res = await fetch(webPath);
    const blob = await res.blob();
    const type = blob.type || 'image/jpeg';
    return new File([blob], filename, { type });
  }
}
