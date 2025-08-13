import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

type BtnVariant = 'solid' | 'outline' | 'clear';
type BtnSize = 'default' | 'small' | 'large';

@Component({
  selector: 'fac-btn',
  templateUrl: './fac-btn.component.html',
  styleUrls: ['./fac-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FacBtnComponent  {
  @Input() label: string = 'Button';
  @Input() icon: string = '';
  @Input() iconEnd: string = '';
  @Input() color: string = 'primary';                 // ← hereda el primary de variables
  @Input() variant: BtnVariant = 'solid';
  @Input() expand: 'full' | 'block' | 'default' = 'block';
  @Input() size: BtnSize = 'default';
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  @Output() clicked = new EventEmitter<void>();

  get fill(): 'solid' | 'outline' | 'clear' { return this.variant; }
  get expandValue(): 'block' | 'full' | undefined { return this.expand === 'default' ? undefined : this.expand; }

  onClick() { if (!this.disabled && !this.loading) this.clicked.emit(); }
}
