import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { ValidationService } from '../../../core/services/validate/validation.service';
import { InputCustomEvent } from '@ionic/angular';

@Component({
  selector: 'fac-input',
  templateUrl: './fac-input.component.html',
  styleUrls: ['./fac-input.component.scss'],
  standalone: false,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FacInputComponent), multi: true }
  ]
})
export class FacInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' | 'tel' | 'number' |'url' | 'date' = 'text' ;
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() formControlName!: string;

  /* extras nativos */
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() clearable = true;
  @Input() inputmode: 'text'|'email'|'tel'|'numeric'|'decimal' = 'text';
  @Input() autocomplete = 'off';
  @Input() maxlength?: number;

  value = '';
  isPasswordVisible = false;

  private validationService = inject(ValidationService);
  private controlContainer = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  defaultError = 'Revisa este campo';

  // CVA
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void {
    this.value = v ?? '';
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onIonInput(ev: InputCustomEvent): void {
    this.value = (ev.detail?.value ?? '') as string;
    this.onChange(this.value);
  }

  togglePasswordVisibility(): void { this.isPasswordVisible = !this.isPasswordVisible; }

  getInputType(): string {
    return this.type === 'password' ? (this.isPasswordVisible ? 'text' : 'password') : this.type;
  }
}
