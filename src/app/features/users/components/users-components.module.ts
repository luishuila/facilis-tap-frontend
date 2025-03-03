import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UpdateUsersInformationComponent } from './update-users-information/update-users-information.component';
import { UpdateUsersCredentialsComponent } from './update-users-credentials/update-users-credentials.component';
import { SharedPageModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    ReactiveFormsModule
  ],
  declarations: [
    UpdateUsersInformationComponent,
    UpdateUsersCredentialsComponent,
  ],
  exports: [
    UpdateUsersInformationComponent,
    UpdateUsersCredentialsComponent,
  ]
})
export class UsersComponentsModule { }
