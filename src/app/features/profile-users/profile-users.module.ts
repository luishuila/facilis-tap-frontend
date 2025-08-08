import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { AppointmentSchedulePageModule } from '../appointment/components/appointment-schedule-components.module';
import { ProfileUsersPage } from './profile-users.page';
import { ProfileUsersPageRoutingModule } from './profile-users-routing.module';
import { SharedPageModule } from 'src/app/shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileUsersPageRoutingModule,
    AppointmentSchedulePageModule,
    SharedPageModule
  ],
  declarations: [ProfileUsersPage]
})
export class ProfileUsersPageModule {}
