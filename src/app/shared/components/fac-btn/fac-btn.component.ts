import { Component, Input, EventEmitter, Output } from '@angular/core';

type BtnVariant = 'solid' | 'outline' | 'clear';
type BtnSize = 'default' | 'small' | 'large';

@Component({
  selector: 'fac-btn',
  templateUrl: './fac-btn.component.html',
  styleUrls: ['./fac-btn.component.scss'],
  standalone: false,
})
export class FacBtnComponent  {
  @Input() label: string = 'Button';
  @Input() icon: string = '';               // icono al inicio
  @Input() iconEnd: string = '';            // icono al final
  @Input() color: string = 'primary';
  @Input() variant: BtnVariant = 'solid';   // solid | outline | clear
  @Input() expand: 'full' | 'block' | 'default' = 'block';
  @Input() size: BtnSize = 'default';       // default | small | large
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  @Output() clicked = new EventEmitter<void>();

  // map variante -> fill de Ionic
  get fill(): 'solid' | 'outline' | 'clear' {
    return this.variant;
  }

  onClick() {
    if (this.disabled || this.loading) return;
    this.clicked.emit();
  }
}
