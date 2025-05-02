import { Component,  Input,  OnInit, Output ,EventEmitter ,ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonList, IonModal } from '@ionic/angular/standalone';
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

  @Output() providerSaved = new EventEmitter<any>();
  selectModal:any
  constructor(private servicesTypeService:ServicesTypeService){
    this.servicesTypeService.findAll().subscribe(data=>this.selectModal=data)
  }
  selectedFruitsText = '0 Items';
  selectedFruits: string[] = [];

  formatData(data: any[]): string {
    if (data.length === 1) {
      const fruit = this.selectModal.find((fruit:any) => fruit.value === data[0]);
      return fruit ? fruit.text : '';
    }
    return `${data.length} items`;
  }
 
  fruitSelectionChanged(fruits: any[]) {
    console.log(fruits)
     this.selectedFruits = fruits;
     this.selectedFruitsText = this.formatData(this.selectedFruits);
     this.modal.dismiss();
   }
  saveProvider() {
    console.log('saveProvider-->', this.providerForm.value)
    this.providerSaved.emit(this.providerForm.value);
  }

   ngOnInit() {

 
   }
   


   




  
 






}
