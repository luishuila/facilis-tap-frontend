import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validate/validation.service';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
})
export class InputRadioComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() icon: string = 'radio-button-on';
  @Input() options: { label: string; value: any }[] = [];
  @Input() disabled: boolean = false;
  value: any = '';
  @Input() formControlName!: string; 
  
  private validationService = inject(ValidationService); 
  private controlContainer = inject(ControlContainer); 
  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectValue(value: any) {
    this.value = value;
    this.onChange(value);
  }
}
