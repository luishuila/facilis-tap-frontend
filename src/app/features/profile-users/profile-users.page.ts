import { Component,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderDto, ProviderDtoI } from 'src/app/core/models/provider/ProviderI';
import { ShareDataService } from 'src/app/core/services/DataShareService/shareDataService';

import { HomeService } from 'src/app/core/services/home/home.service';
import { ViewWillEnter } from '@ionic/angular';
import { usersData } from 'src/app/core/generate/idData';
import { UsersService } from 'src/app/core/services/user/users.service';
@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.page.html',
  styleUrls: ['./profile-users.page.scss'],
  standalone: false,
})
export class ProfileUsersPage  implements ViewWillEnter {
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


  imgFile: File | null = null;
  avatarPreview: string | null = null; 
  


    constructor( private route: ActivatedRoute,
      private usersService:UsersService
     ) {
      const id = this.route.snapshot.queryParamMap.get('id');
      
      console.log('id-->', usersData().id)
    }
    ionViewWillEnter() {
   
    }
    onImageFileSelected(file: File) {
      this.imgFile = file;
    
      // Si quieres ver la imagen antes de guardar, genera la vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log('this.imgFile', this.imgFile)
      this.usersService.updateImage(usersData().id,this.imgFile ).subscribe(data=>{
        console.log('data-->', data)
      })
    }

    
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
