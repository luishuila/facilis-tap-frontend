import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomedosPageRoutingModule } from './homedos-routing.module';

import { HomedosPage } from './homedos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomedosPageRoutingModule
  ],
  declarations: [HomedosPage],
  exports:[HomedosPage]
})
export class HomedosPageModule {}
