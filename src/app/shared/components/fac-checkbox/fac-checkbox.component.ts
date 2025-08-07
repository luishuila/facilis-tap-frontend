import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'fac-checkbox',
  templateUrl: './fac-checkbox.component.html',
  styleUrls: ['./fac-checkbox.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacCheckboxComponent),
      multi: true,
    },
  ],
})
export class FacCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = ''; // leyenda del grupo
  @Input() checkboxLabel: string = ''; // etiqueta al lado del checkbox
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() disabled: boolean = false;
  @Input() formControlName!: string;

  value: boolean = false;

  private controlContainer = inject(ControlContainer);
  private validationService = inject(ValidationService);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleChecked(event: any) {
    this.value = event.detail.checked;
    this.onChange(this.value);
  }
}
