import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { usersData } from 'src/app/core/generate/idData';
import { CategoryDto, SubcategoryDto } from 'src/app/core/models/category/category.dto';
import { ServiceCreate } from 'src/app/core/models/services/Service';
import { ServiceCreateDto } from 'src/app/core/models/services/ServiceCreateDto';
import { CategoryService } from 'src/app/core/services/category/category.service';
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
  categoryAll:CategoryDto[] =[];
  providerList:any[] =[];
  subCategory:SubcategoryDto[] = []
  @Input() isValidates:boolean = true;

  proveder:any

  constructor(private fb: FormBuilder, private servicesTypeService:ServicesTypeService,
    private providerService:ProviderService,   private route: ActivatedRoute,
    private categoryService:CategoryService
  ) {
    console.log('this.route.snapshot.paramMap.get-->', this.route.snapshot.paramMap.get('id'))
    // this.categoryService.findAllCategory().subscribe(data=>this.categoryAll = data)

    // this.providerService.findOneProvedor(Number(this.route.snapshot.paramMap.get('id'))).subscribe((data:any)=>{
    //   this.proveder = data
    //   this.categoryAll = data.categories
    // })
    // if(this.route.snapshot.paramMap.get('id')){
    //   this.isValidates = false;
    
    //   //  this.servicesTypeService.findAll().subscribe(data=>{
    //   //   this.servicesType=data
    //   // })
    // }
    // if(this.isValidates){
    //   this.providerService.findOneAll().subscribe(data=>{
    //     this.providerList = data
    //   })
    // }

  }
  ngOnInit() {
    // this.servicesForm = this.fb.group({
    //   data: this.fb.array([this.createServiceForm()])
    // });
  }
  onSelectItem(itemEvent:any, index: number){
    const subcategoryId = itemEvent.detail.value;

    const selectedService = this.proveder.services.find(
      (service:any) => service.subcategory?.id == subcategoryId
    );
    const formArray = this.servicesForm.get('data') as FormArray;

    if (selectedService) {
      const formGroup = formArray.at(index) as FormGroup;
  
      formGroup.patchValue({
        name: selectedService.name,
        serviceTime: selectedService.serviceTime,
        price: selectedService.price,
        img: selectedService.img || '',
        description:selectedService.description,
        subcategory: subcategoryId 
      });
  
      console.log('Servicio cargado en el formulario:', selectedService);
    }
   
  }

  getAvailableSubcategories(currentIndex: number): any[] {
    const formArray = this.servicesForm.get('data') as FormArray;
  
    const selectedIds = formArray.controls
      .map((fg, i) => i !== currentIndex ? fg.get('subcategory')?.value : null)
      .filter(id => id !== null);
  
    
    return this.subCategory.filter(sub => !selectedIds.includes(sub.id));
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
      category: [null, Validators.required],
      subcategory:[null,Validators.required],
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
    console.log('this.servicesForm.valid →', this.servicesForm.valid);
    console.log('this.servicesForm →', this.servicesForm);
    if (this.servicesForm.valid) {
      let serviceCreate:ServiceCreate[] = this.servicesForm.value.data.map((item:ServiceCreateDto) =>{ 
            return new ServiceCreate(item);
        })  
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
  onSubCategory(event: any) {
    this.categoryService.findAllSubCategory(event.detail.value).subscribe(data=>{

      this.subCategory = data
    
    })
  }
 
}