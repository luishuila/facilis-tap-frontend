import { Component, EventEmitter, Input, Output, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { GalleryPermissionsService } from 'src/app/core/services/genericService/gallery-permissions.service';
import { LocationService } from 'src/app/core/services/genericService/location.service';

type AvatarMode = 'view' | 'edit' | 'auto';
type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fac-avatar',
  templateUrl: './fac-avatar.component.html',
  styleUrls: ['./fac-avatar.component.scss'],
  standalone: false,
})
export class FacAvatarComponent {
  /** URL de imagen (dataURL o remota) */
  @Input() avatarUrl: string | null = null;
  /** Placeholder por si no hay imagen */
  @Input() placeholder: string = 'assets/img/avatar-placeholder.png';
  /** 'view' | 'edit' | 'auto' */
  @Input() mode: AvatarMode = 'view';
  /** Tamaño: sm | md | lg */
  @Input() size: AvatarSize = 'md';
  /** Anillo/marco visual */
  @Input() ring = true;
  /** Texto para iniciales (si falla imagen) */
  @Input() nameForInitials: string = '';
  /** Texto alternativo accesible */
  @Input() alt: string = 'Avatar';

  /** Emite el archivo seleccionado */
  @Output() imageSelected = new EventEmitter<File>();

  /** Estado de carga/errores */
  isLoading = false;
  isError = false;

  /** Ref al input de fallback web */
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef<HTMLInputElement>;

  constructor(private gallery: GalleryPermissionsService,     private locationService: LocationService) {}

  /** CSS host classes (para tamaño) */
  @HostBinding('class.size-sm') get isSm() { return this.size === 'sm'; }
  @HostBinding('class.size-md') get isMd() { return this.size === 'md'; }
  @HostBinding('class.size-lg') get isLg() { return this.size === 'lg'; }
  @HostBinding('class.has-ring') get hasRing() { return !!this.ring; }

  get effectiveMode(): AvatarMode {
    if (this.mode !== 'auto') return this.mode;
    return this.avatarUrl ? 'view' : 'edit';
  }

  get showInitials(): string {
    if (!this.nameForInitials) return '';
    const parts = this.nameForInitials.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() ?? '').join('');
  }

  onStartLoading() { this.isLoading = true; this.isError = false; }
  onLoadOk()       { this.isLoading = false; this.isError = false; }
  onLoadError()    { this.isLoading = false; this.isError = true; }

  /** Abrir galería (nativo) o fallback web */
  async openGalleryFromAvatar() {
    if (this.effectiveMode !== 'edit') return;

    // Detecta entorno. Con Capacitor 5 puedes usar getPlatform()
    const isWeb = (window as any).Capacitor?.getPlatform?.() === 'web';

    if (isWeb) {
      // Fallback web: dispara el input file
      this.fileInput?.nativeElement.click();
      return;
    }

    try {
      this.onStartLoading();
      const { file, webPath } = await this.gallery.pickOneFromGallery(); // servicio global
      this.avatarUrl = webPath;        // previsualiza
      this.imageSelected.emit(file);   // emite al padre
      this.onLoadOk();
    } catch (e) {
      console.warn('openGalleryFromAvatar error:', e);
      this.onLoadError();
    }
  }

  /** Fallback web: manejar el input type="file" */
  onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.imageSelected.emit(file);

    // Previsualización inmediata
    const reader = new FileReader();
    this.onStartLoading();
    reader.onload = (e: any) => {
      this.avatarUrl = e.target.result;
      this.onLoadOk();
    };
    reader.onerror = () => this.onLoadError();
    reader.readAsDataURL(file);

    // Limpia el input para permitir volver a seleccionar el mismo archivo
    input.value = '';
  }
}
