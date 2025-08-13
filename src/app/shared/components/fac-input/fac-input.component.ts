import { Component, Input, forwardRef, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { InputCustomEvent } from '@ionic/angular';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'fac-input',
  templateUrl: './fac-input.component.html',
  styleUrls: ['./fac-input.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacInputComponent),
      multi: true,
    },
  ],
})
export class FacInputComponent implements ControlValueAccessor {
  // Props
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

  // Estado interno (string | number | null para soportar tipos)
  value: string | number | null = null;
  isPasswordVisible = false;
  defaultError = 'Revisa este campo';

  // Inyecciones
  private readonly validationService = inject(ValidationService);
  private readonly controlContainer = inject(ControlContainer);
  private readonly cdr = inject(ChangeDetectorRef);
  // Validación accesible
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
    if (this.type === 'password') return this.isPasswordVisible ? 'text' : 'password';
    return this.type;
  }

  // CVA
  onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: any): void {
    if (this.type === 'number') {
      this.value = (v === '' || v === undefined || v === null) ? null : Number(v);
    } else {
      this.value = v ?? '';
    }
    this.cdr.markForCheck(); 
  }
  registerOnChange(fn: (v: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck(); // 🔑
    console.log('HOla mundo--------->',  this.value )
  }
  // Eventos
  onIonInput(ev: InputCustomEvent): void {
    const raw = ev.detail?.value;
    if (this.type === 'number') {
      const parsed = (raw === '' || raw == null) ? null : Number(raw);
      this.value = parsed;
      this.onChange(parsed);
    } else {
      this.value = raw ?? '';
      this.onChange(this.value);
    }
  }
  onBlur(): void { this.onTouched(); }
  togglePasswordVisibility(): void { this.isPasswordVisible = !this.isPasswordVisible; }
}
