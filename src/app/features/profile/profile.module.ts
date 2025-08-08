import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './Profile-routing.module';
import { ProfilePage } from './profile.page';
import { AppointmentSchedulePageModule } from '../appointment/components/appointment-schedule-components.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    AppointmentSchedulePageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
