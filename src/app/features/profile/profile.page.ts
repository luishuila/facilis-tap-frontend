import { Component,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderDto, ProviderDtoI } from 'src/app/core/models/provider/ProviderI';
import { ShareDataService } from 'src/app/core/services/DataShareService/shareDataService';

import { HomeService } from 'src/app/core/services/home/home.service';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage  implements ViewWillEnter {
  profile?:ProviderDto  ;  
  selectedTab = 'cita';
  company = {
    name: 'Von Inc',
    description: 'Servicios de belleza personalizados para toda la familia.',
    phone: '+57 300 1234567',
    url: 'https://voninc.com',
    type: 'Independiente',
    location: 'Cra. 45 #123-45, Medellín, Antioquia',
    city: 'Medellín'
  };

  @ViewChild('daySegment', { static: false }) daySegment: any;
  private daysInitialized = false;


          // 1) Lee el obligatorio desde el path
    idProveder:any 
    categoryId :any 
    subcategoryId :any 
    userId:any 

    constructor( private route: ActivatedRoute,  private sharedData: ShareDataService<{idProveder?:number,categoryId?:number, subcategoryId?:number, item:any}>, 
      
      private homeService:HomeService) {
  
    }
    ionViewWillEnter() {
         this.idProveder = Number(this.route.snapshot.paramMap.get('idProveder'));
      this.userId = this.route.snapshot.paramMap.get('userId');
    // 2) Lee los opcionales desde query params
      let qp = this.route.snapshot.queryParamMap;
      this.categoryId = qp.has('categoryId') ? Number(qp.get('categoryId')) : undefined;
      this.subcategoryId = qp.has('subcategoryId') ? Number(qp.get('subcategoryId')) : undefined;

      this.profile = this.sharedData.data;
    
      this.homeService.profile(this.idProveder,  this.categoryId, this.subcategoryId ).
      subscribe(data=>{console.log(data); this.profile =data})
       console.log('sharedData-1->',this.userId)
      console.log('sharedData-1->',this.idProveder)
    }

    // ngOnInit() {
    //   console.log('this.profile-->', this.profile)
    // }e?.users?.name || e?.name

    
    stories = [
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5',  },
    ];



  
    
}
