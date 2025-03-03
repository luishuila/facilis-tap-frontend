import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../core/services/validate/validation.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() icon: string = 'list'; 
  @Input() disabled: boolean = false;
  @Input() formControlName!: string;
  @Input() options: any[] = [];  // Recibe un array de cualquier tipo de objeto
  @Input() valueField: string = 'value';  // Campo usado para `value`
  @Input() labelField: string = 'label';  // Campo usado para `label`

  value: string | number = '';
  control: AbstractControl | null = null;
  private validationService = inject(ValidationService);
  private controlContainer = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  onChange: (value: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number): void {
    this.value = value ?? ''; 
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any): void {
    this.value = event.detail.value;
    this.onChange(this.value);
  }
}
