import { Component, EventEmitter, Input, Output, ViewChild, forwardRef, inject } from '@angular/core';
import { IonDatetime, IonModal } from '@ionic/angular';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'fac-date',
  templateUrl: './fac-date.component.html',
  styleUrls: ['./fac-date.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FacDateComponent), multi: true },
  ],
  standalone: false,
})
export class FacDateComponent implements ControlValueAccessor {
  @Output() dateSelected = new EventEmitter<string>();
  @ViewChild('dateTime', { static: false }) dateTime!: IonDatetime;
  @ViewChild('modal',    { static: false }) modal!: IonModal;

  @Input() label = 'Fecha';
  @Input() icon  = 'calendar-clear-outline';
  @Input() placeholder = 'Selecciona una fecha';
  @Input() type: 'date' | 'time' | 'datetime' = 'date';
  @Input() formControlName!: string;

  /* mensajes opcionales, igual que el input genérico */
  @Input() helperText = '';
  @Input() errorText  = '';

  selectedDate = '';
  isOpen = false;

  private validationService = inject(ValidationService);
  private controlContainer  = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }
  get defaultError(): string { return 'Revisa este campo'; }

  /* presentación nativa según tipo */
  get presentation(): 'date'|'time'|'date-time' {
    return this.type === 'datetime' ? 'date-time' : this.type;
  }

  /* Valor mostrado bonito */
  get displayValue(): string {
    if (!this.selectedDate) return '';
    try {
      if (this.type === 'time') {
        // HH:mm en 24h
        const d = new Date(`1970-01-01T${this.selectedDate}`);
        return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      const d = new Date(this.selectedDate);
      const date = d.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
      if (this.type === 'datetime') {
        const time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${date} ${time}`;
      }
      return date;
    } catch { return this.selectedDate; }
  }

  // CVA
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.selectedDate = v || ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  /* Modal control */
  openModal(): void { if (!this.disabled) this.isOpen = true; }
  cancel(): void { this.isOpen = false; }
  confirm(): void {
    // IonDatetime ya disparó onDateChange, solo cerramos si hay valor
    this.isOpen = false;
  }

  onDateChange(ev: CustomEvent) {
    const val = (ev.detail as any)?.value as string;
    this.selectedDate = val || '';
    this.onChange(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  @Input() disabled = false;
}
