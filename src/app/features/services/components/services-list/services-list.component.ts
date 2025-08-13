import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/core/services/servicesType/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  standalone: false
})
export class ServicesListComponent implements OnInit {
  servicesList:any[]=[];
  @Input() isValidates:boolean = true;
  constructor(private servicesTypeService: ServicesService, private router: Router
  
  ) {

    // this.servicesTypeService.findOneAllServices().subscribe(data=>{
    //   this.servicesList = data
    // })
  }

  ngOnInit() { }
  url(urls:any){
    if (this.isValidates) {
      this.router.navigate([`navigation/services`]); 
    }else{
      this.router.navigate([`navigation/services/empleyees/true`]); 
    }
  }
}
