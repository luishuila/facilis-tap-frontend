import { Component,  Input,  OnInit, Output ,EventEmitter } from '@angular/core';
import {  FormGroup } from '@angular/forms';


@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  standalone: false,
})
export class ProviderFormComponent implements OnInit {

  @Input() providerForm!: FormGroup;
  @Input() isDisabled: boolean = false;

  @Output() providerSaved = new EventEmitter<any>();

  saveProvider() {
    console.log('saveProvider-->', this.providerForm.value)
    this.providerSaved.emit(this.providerForm.value);
  }

   ngOnInit() {

 
   }
   








}
