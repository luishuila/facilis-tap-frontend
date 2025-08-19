import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type FacBtnVariant = 'solid' | 'outline' | 'clear';
export type FacBtnSize = 'default' | 'small' | 'large';

export interface FacListAction {
  id: string;                 // identificador del evento (p.ej. 'update', 'register', 'create-employee')
  label: string;
  icon?: string;
  iconEnd?: string;
  variant?: FacBtnVariant;    // solid | outline | clear
  color?: string;             // 'primary'|'medium'|'success'...
  size?: FacBtnSize;          // 'small' por defecto
  neutral?: boolean;          // true => outline gris (usa tu fac-btn.neutral)
  customClass?: string;
}

export interface FacListField {
  name?: string;      // por defecto 'tag'
  id?: string;       // por defecto 'id'
  description?: string;     // por defecto 'left'
  text?: string;    // por defecto 'right'
  imgUrl?: string;   // por defecto 'imgUrl'
}
export interface FacListLabels {
  tag?: string;
  id?: string;
  description?: string;
  text?: string;
}
@Component({
  selector: 'fac-list',
  templateUrl: './fac-list.component.html',
  styleUrls: ['./fac-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FacListComponent {
  /** Datos a renderizar  */
  @Input() items: any[] = [];
      @Input() labels: FacListLabels = {};

  /** Mapeo de campos desde tu modelo → {tag,id,left,right,imgUrl} */
  @Input() fieldMap: FacListField = { name: 'name', id: 'id', description: 'description', text: 'text', imgUrl: 'imgUrl' };

  /** Azúcar sintáctica para compatibilidad con tu viejo [valueOptional]="'name'" */
  @Input() set valueOptional(key: string | undefined) {
    if (key) this.fieldMap = { ...this.fieldMap, name: key };
  }

  /** Acciones dinámicas (botones); vacío = oculta bloque */
  @Input() actions: FacListAction[] = [];

  /** Mostrar botón chevron en el header */
  @Input() showChevron = true;

  /** Placeholder de imagen si no hay miniatura */
  @Input() thumbPlaceholder = 'assets/placeholder.png';

  /** Eventos hacia el padre */
  @Output() select = new EventEmitter<any>();
  @Output() chevron = new EventEmitter<any>();
  @Output() action = new EventEmitter<{ action: string; item: any }>();

  // Helpers
  trackById = (_: number, it: any) => this.read(it, this.fieldMap.id) ?? _;

  read(obj: any, path?: string, fallback: any = null): any {
    if (!obj || !path) return fallback;
    if (!path.includes('.')) return obj?.[path] ?? fallback;
    return path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj) ?? fallback;
  }

  // UI handlers
  onSelect(it: any) { this.select.emit(it); }

  onChevron(it: any, ev: Event) {
    ev.stopPropagation();
    this.chevron.emit(it);
  }

  // ✅ ya no recibe Event; 'clicked' emite void
  onActionClick(a: FacListAction, it: any) {
    this.action.emit({ action: a.id, item: it });
  }

onThumbError(ev: Event) {
  const img = ev.target as HTMLImageElement | null;
  // Oculta la miniatura si la imagen falla
  if (img) {
    const wrap = img.closest('.thumb') as HTMLElement | null;
    if (wrap) wrap.style.display = 'none';
  }
}
}
