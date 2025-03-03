import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorMenuPageRoutingModule } from './administrator-menu-routing.module';

import { AdministratorMenuPage } from './administrator-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorMenuPageRoutingModule
  ],
  declarations: [AdministratorMenuPage]
})
export class AdministratorMenuPageModule {}
