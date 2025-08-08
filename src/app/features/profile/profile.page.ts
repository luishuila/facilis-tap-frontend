import { Component,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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




    constructor(private router: Router,   private sharedData: ShareDataService<{idProveder?:number,categoryId?:number, subcategoryId?:number, item:any}>, 
      
      private homeService:HomeService) {
        // this.sharedData.data?.idProveder??
        console.log('this.sharedData.data?.categoryId', this.sharedData.data?.categoryId)
      this.homeService.profile( this.sharedData.data?.idProveder, this.sharedData.data?.categoryId, this.sharedData.data?.subcategoryId).
      subscribe(data=>{console.log(data); this.profile =data})
      
      console.log('sharedData-1->',this.profile)
    }
    ionViewWillEnter() {
      this.profile = this.sharedData.data;
      console.log('this.sharedData.data?.categoryId', this.sharedData.data?.categoryId)
      this.homeService.profile( this.sharedData.data?.idProveder, this.sharedData.data?.categoryId, this.sharedData.data?.subcategoryId).
      subscribe(data=>{console.log(data); this.profile =data})
      
      console.log('sharedData-1->',this.profile)
    }
    // ngOnInit() {
    //   console.log('this.profile-->', this.profile)
    // }

    
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
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
    ];



  
    
}
