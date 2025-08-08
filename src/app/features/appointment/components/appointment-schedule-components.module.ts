import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPageModule } from 'src/app/shared/shared.module';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  declarations: [AppointmentScheduleComponent],
  exports:[AppointmentScheduleComponent]
})
export class AppointmentSchedulePageModule {}
