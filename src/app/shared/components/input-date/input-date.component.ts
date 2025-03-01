import { Component, EventEmitter, Input, Output, ViewChild,forwardRef  } from '@angular/core';
import { IonDatetime, IonModal } from '@ionic/angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor {
  @Output() dateSelected = new EventEmitter<string>();
  @ViewChild('dateTime', { static: false }) dateTime!: IonDatetime;
  @ViewChild('modal', { static: false }) modal!: IonModal;

  @Input() label: string = 'Fecha';
  @Input() icon: string = 'calendar-clear-outline';
  @Input() placeholder: string = 'Selecciona una fecha';
  @Input() type: 'date' | 'time' | 'datetime' = 'date';  // Permite cambiar el tipo de selector

  selectedDate: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }
  
  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }
  onDateChange(event: CustomEvent) {
    this.selectedDate = event.detail.value;
    this.onChange(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
    this.closeModal();
  }

  // Métodos para trabajar con FormControl
  writeValue(value: string): void {
    this.selectedDate = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}