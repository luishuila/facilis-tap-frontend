import { Component, EventEmitter, Input, Output, ViewChild,forwardRef, inject  } from '@angular/core';
import { IonDatetime, IonModal } from '@ionic/angular';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'fac-date',
  templateUrl: './fac-date.component.html',
  styleUrls: ['./fac-date.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacDateComponent),
      multi: true,
    },
  ],
})
export class FacDateComponent implements ControlValueAccessor {
  @Output() dateSelected = new EventEmitter<string>();
  @ViewChild('dateTime', { static: false }) dateTime!: IonDatetime;
  @ViewChild('modal', { static: false }) modal!: IonModal;

  @Input() label: string = 'Fecha';
  @Input() icon: string = 'calendar-clear-outline';
  @Input() placeholder: string = 'Selecciona una fecha';
  @Input() type: 'date' | 'time' | 'datetime' = 'date';  // Permite cambiar el tipo de selector
  @Input() formControlName!: string; 

  selectedDate: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  private validationService = inject(ValidationService); 
  private controlContainer = inject(ControlContainer); 
  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }


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