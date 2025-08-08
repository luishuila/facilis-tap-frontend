import { Component, Input, OnInit, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';

type SelectInterface = 'action-sheet' | 'alert' | 'popover';

@Component({
  selector: 'fac-select',
  templateUrl: './fac-select.component.html',
  styleUrls: ['./fac-select.component.scss'],
  standalone: false,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FacSelectComponent), multi: true }
  ]
})
export class FacSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() placeholder = 'Selecciona una opción';
  @Input() icon = 'list';
  @Input() disabled = false;
  @Input() formControlName!: string;

  @Input() valueField = 'value';
  @Input() labelField = 'label';
  @Input() title = 'Seleccionar';
  @Input() items: any[] = [];

  /** Modal custom (para listas largas / multiselección) */
  @Input() selectModal = false;
  @Input() selectedItems: string[] = [];

  /** Texto visible en el modo modal */
  selectedText = '';

  /** Interfaz nativa por plataforma (iOS = action-sheet, Android = alert) */
  selectInterface: SelectInterface = 'alert';

  /** Mensaje de error opcional */
  @Input() errorText = '';
  defaultError = 'Revisa este campo';

  /** Control de error externo */
  @Input() hasError: boolean = false;

  value: string | number | null = null;

  constructor(private platform: Platform) {}

  @ViewChild('modal') modal!: IonModal;
  @Output() selectionChange = new EventEmitter<string[]>();

  ngOnInit(): void {
    // Interface nativa por plataforma
    this.selectInterface = this.platform.is('ios') ? 'action-sheet' : 'alert';
    this.updateSelectedText();
  }

  // CVA
  onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(v: any): void { this.value = v ?? null; }
  registerOnChange(fn: (v: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onSelectionChange(ev: CustomEvent): void {
    this.value = ev.detail.value;
    this.onChange(this.value);
  }

  // ---- Modal personalizado ----
  updateSelectedText(): void {
    const n = this.selectedItems?.length ?? 0;
    this.selectedText = n > 0 ? `${n} seleccionado${n > 1 ? 's' : ''}` : this.placeholder;
  }

  onSelectionChangeModal(values: string[]): void {
    this.selectedItems = values ?? [];
    this.updateSelectedText();
    this.selectionChange.emit(values);
    this.modal?.dismiss();
  }
}
