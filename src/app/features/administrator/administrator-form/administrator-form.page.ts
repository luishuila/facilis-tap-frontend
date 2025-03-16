import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.page.html',
  styleUrls: ['./administrator-form.page.scss'],
  standalone: false
})
export class AdministratorFormPage implements OnInit {

  providerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.providerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      img: [''],
      website: [''],
      nit: ['', Validators.required],
      invima: [''],
       companyIdentifier: [''],
      logoUrl: [''],
       description: ['']
    });
  }

  saveProvider() {
    if (this.providerForm.valid) {
      console.log('Proveedor registrado:', this.providerForm.value);
    }
  }

   ngOnInit() {

 
   }
   



}