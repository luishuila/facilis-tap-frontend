import { NgModule,
  CUSTOM_ELEMENTS_SCHEMA 
 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule
  ],
  declarations: [HomePage],
  exports: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
