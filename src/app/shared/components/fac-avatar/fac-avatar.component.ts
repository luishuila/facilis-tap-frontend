import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';

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

  /** 'view' | 'edit' | 'auto' (auto = view si hay url, edit si no) */
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

  onStartLoading() {
    this.isLoading = true;
    this.isError = false;
  }

  onLoadOk() {
    this.isLoading = false;
    this.isError = false;
  }

  onLoadError() {
    this.isLoading = false;
    this.isError = true;
  }

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
  }
}
