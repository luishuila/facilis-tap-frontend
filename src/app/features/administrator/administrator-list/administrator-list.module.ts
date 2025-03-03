import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorListPageRoutingModule } from './administrator-list-routing.module';

import { AdministratorListPage } from './administrator-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorListPageRoutingModule
  ],
  declarations: [AdministratorListPage]
})
export class AdministratorListPageModule {}
