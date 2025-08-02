import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { usersData } from 'src/app/core/generate/idData';
import { ServiceCreate } from 'src/app/core/models/services/Service';
import { ServiceCreateDto } from 'src/app/core/models/services/ServiceCreateDto';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { ServicesTypeService } from 'src/app/core/services/servicesType/services-type.service';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
  standalone: false
})
export class ServicesFormComponent  implements OnInit {

  servicesForm!: FormGroup;
  servicesType:any[] =[];
  providerList:any[] =[];
  @Input() isValidates:boolean = true;
  
  constructor(private fb: FormBuilder, private servicesTypeService:ServicesTypeService,
    private providerService:ProviderService,   private route: ActivatedRoute,
    
  ) {
    
    if(this.route.snapshot.paramMap.get('id')){
      this.isValidates = false;

       this.servicesTypeService.findAll().subscribe(data=>{
        this.servicesType=data
      })
    }
    if(this.isValidates){
      this.providerService.findOneAll().subscribe(data=>{
        this.providerList = data
      })
    }

  }

  ngOnInit() {
    this.servicesForm = this.fb.group({
      data: this.fb.array([this.createServiceForm()])
    });
  }

  get services(): FormArray {
    return this.servicesForm.get('data') as FormArray;
  }

  createServiceForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      serviceTime: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      providers: [null, this.isValidates ? Validators.required : []],
      servicesTypes: [null, Validators.required],
    });
  }

  addServiceForm() {
    this.services.push(this.createServiceForm());
  }

  removeServiceForm(index: number) {
    if (this.services.length > 1) {
      this.services.removeAt(index);
    }
  }

  onSubmit() {
    if (this.servicesForm.valid) {
      let serviceCreate:ServiceCreate[] = this.servicesForm.value.data.map((item:ServiceCreateDto) =>{ 
          if(!this.isValidates){
            return {
              ...new ServiceCreate(item),
              employees:usersData().id
            }
          }else{
            return new ServiceCreate(item);
          }
        }  )  
      console.log('Formulario completo serviceCreate →', serviceCreate);
      this.servicesTypeService.create(serviceCreate).subscribe(data=>{
        console.log('create--->',data )
      })
    } else {
      this.servicesForm.markAllAsTouched();
    }
  }

  onProvidersSelected(event:any){
    this.servicesType = []
    this.servicesType  =  this.providerList.find(data=>data.id === event.detail?.value).servicesTypes
  }
}