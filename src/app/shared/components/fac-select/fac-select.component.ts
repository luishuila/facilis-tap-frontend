import { Component, Input, OnInit, forwardRef, inject, Output ,EventEmitter ,ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../core/services/validate/validation.service';
import {  FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular/standalone';
@Component({
  selector: 'fac-select',
  templateUrl: './fac-select.component.html',
  styleUrls: ['./fac-select.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacSelectComponent),
      multi: true
    }
  ]
})
export class FacSelectComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() icon: string = 'list'; 
  @Input() disabled: boolean = false;
  @Input() formControlName!: string;
  @Input() valueField: string = 'value';  
  @Input() labelField: string = 'label';  
  @Input() title: string = 'Select Items';
  @Input() items: any[] = [];
  @Input() selectedItems: string[] = [];
  @Input() selectModal: boolean = false;

  value: string | number = '';
  control: AbstractControl | null = null;
  private validationService = inject(ValidationService);
  private controlContainer = inject(ControlContainer);

  get hasError(): boolean {
    return this.validationService.hasError(this.controlContainer, this.formControlName);
  }

  @ViewChild('modal') modal!: IonModal;





  @Output() selectionChange = new EventEmitter<string[]>();

  selectedText = '0 Items';

  updateSelectedText() {
    this.selectedText = `${this.selectedItems.length} Items`;
  }

  onSelectionChangeModal(values: string[]) {
    this.selectedItems = values;
    this.updateSelectedText();
    this.selectionChange.emit(values);
    this.modal.dismiss();
  }

  ngOnInit() {
    this.updateSelectedText();
  }

  // ngOnInit(): void {
  //   // console.log('options', this.options)
  // }
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
