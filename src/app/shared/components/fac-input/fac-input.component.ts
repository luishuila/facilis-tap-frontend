import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { InputCustomEvent } from '@ionic/angular';
import { ValidationService } from 'src/app/core/services/validate/validation.service';


@Component({
  selector: 'fac-input',
  templateUrl: './fac-input.component.html',
  styleUrls: ['./fac-input.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacInputComponent),
      multi: true,
    },
  ],
})
export class FacInputComponent implements ControlValueAccessor {
  // Inputs configurables
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' | 'tel' | 'number' | 'url' | 'date' = 'text';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() formControlName!: string;

  @Input() helperText = '';
  @Input() errorText = '';
  @Input() clearable = true;
  @Input() inputmode: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' = 'text';
  @Input() autocomplete = 'off';
  @Input() maxlength?: number;

  // Estado interno
  value = '';
  isPasswordVisible = false;
  defaultError = 'Revisa este campo';

  // Inyecciones
  private readonly validationService = inject(ValidationService);
  private readonly controlContainer = inject(ControlContainer);

  // Getters para errores y tipo de input
  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  get errorMessage(): string {
    return (
      this.validationService.getErrorMessage(this.controlContainer, this.formControlName) ||
      this.errorText ||
      this.defaultError
    );
  }

  get inputType(): string {
    return this.type === 'password'
      ? (this.isPasswordVisible ? 'text' : 'password')
      : this.type;
  }

  // Métodos de ControlValueAccessor
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  // Eventos
  onIonInput(ev: InputCustomEvent): void {
    this.value = (ev.detail?.value ?? '') as string;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
