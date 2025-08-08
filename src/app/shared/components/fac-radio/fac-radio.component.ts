import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'fac-radio',
  templateUrl: './fac-radio.component.html',
  styleUrls: ['./fac-radio.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FacRadioComponent), multi: true },
  ],
  standalone: false,
})
export class FacRadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() icon  = 'radio-button-on';
  @Input() options: { label: string; value: any }[] = [];
  @Input() disabled = false;
  @Input() formControlName!: string;

  /* mensajes opcionales como en los otros inputs */
  @Input() helperText = '';
  @Input() errorText = '';

  value: any = '';
  defaultError = 'Revisa este campo';

  private validationService = inject(ValidationService);
  private controlContainer  = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  // CVA
  onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: any): void { this.value = v; }
  registerOnChange(fn: (v: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  selectValue(v: any) {
    this.value = v;
    this.onChange(v);
    this.onTouched();
  }
}
