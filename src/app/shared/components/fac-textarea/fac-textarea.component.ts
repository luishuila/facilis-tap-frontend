import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { ValidationService } from '../../../core/services/validate/validation.service';
import type { TextareaInputEventDetail } from '@ionic/core';


@Component({
  selector: 'fac-textarea',
  templateUrl: './fac-textarea.component.html',
  styleUrls: ['./fac-textarea.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FacTextareaComponent), multi: true }
  ],
  standalone: false,
})
export class FacTextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Escribe aquí…';
  @Input() icon = 'document-text';
  @Input() disabled = false;
  @Input() formControlName!: string;

  /* extras nativos */
  @Input() helperText = '';
  @Input() errorText  = '';
  @Input() maxlength?: number;
  @Input() rows = 3;
  @Input() autoGrow = true;

  value = '';
  defaultError = 'Revisa este campo';

  private validationService = inject(ValidationService);
  private controlContainer  = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  // CVA
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onIonInput(ev: CustomEvent<TextareaInputEventDetail> | any){
    this.value = (ev?.detail?.value ?? '') as string;
    this.onChange(this.value);
  }
}
