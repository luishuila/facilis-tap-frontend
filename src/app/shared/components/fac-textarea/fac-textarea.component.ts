import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../core/services/validate/validation.service';

@Component({
  selector: 'fac-textarea',
  templateUrl: './fac-textarea.component.html',
  styleUrls: ['./fac-textarea.component.scss'],  
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacTextareaComponent),
      multi: true
    }
  ],
  standalone: false,
})

export class FacTextareaComponent  implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Escribe aquí...';
  @Input() icon: string = 'document-text'; 
  @Input() disabled: boolean = false;
  @Input() formControlName!: string;
  
  value: string = '';
  control: AbstractControl | null = null;
  private validationService = inject(ValidationService);
  private controlContainer = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? ''; 
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue: string = inputElement?.value ?? ''; 
    this.value = newValue;
    this.onChange(this.value);
  }
}