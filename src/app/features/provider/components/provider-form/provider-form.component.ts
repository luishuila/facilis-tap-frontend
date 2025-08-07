import { Component,  Input,  OnInit, Output ,EventEmitter ,ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonList, IonModal } from '@ionic/angular/standalone';
import { contributor, genderObject } from 'src/app/core/constant/constants';
import { roleEnum } from 'src/app/core/constant/enum';
import { usersData } from 'src/app/core/generate/idData';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ServicesTypeService } from 'src/app/core/services/servicesType/services-type.service';


@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  standalone: false,
})
export class ProviderFormComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @Input() providerForm!: FormGroup;
  @Input() isDisabled: boolean = false;
  @Input() independent:boolean = true;
  @Output() providerSaved = new EventEmitter<any>();
  selectModal:any
  contributor = contributor;
 
  constructor(private categoryService:CategoryService,private servicesTypeService:ServicesTypeService){
     this.categoryService.findAllCategory().subscribe(data=>{
       this.selectModal=data
     })
    // this.independent = !usersData().validateRoles(roleEnum.INDEPENDENT)
  }

  selectedServices: any[] = [];

  formatData(data: any[]): string {
    if (data.length === 1) {
      const fruit = this.selectModal.find((fruit:any) => fruit.value === data[0]);
      return fruit ? fruit.text : '';
    }
    return `${data.length} items`;
  }
 

  saveProvider() {
 
    this.providerSaved.emit(this.providerForm.value);
  }
  onServicesChanged(values: any) {
    console.log(values)
    this.providerForm.get('categories')?.setValue(values);
  }

   ngOnInit() {

 
   }
   


}
