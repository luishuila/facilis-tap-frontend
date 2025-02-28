import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectivesPageRoutingModule } from './directives-routing.module';

import { DirectivesPage } from './directives.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesPageRoutingModule
  ],
  declarations: [DirectivesPage]
})
export class DirectivesPageModule {}
