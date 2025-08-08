import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AppointmentPage } from './appointment.page';
import { AppointmentRoutingModule } from './appointment-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentRoutingModule
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
