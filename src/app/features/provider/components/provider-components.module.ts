import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPageModule } from 'src/app/shared/shared.module';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonSearchbar,
} from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    ReactiveFormsModule,
    IonAvatar,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonContent, IonItem, IonLabel, IonList, IonModal,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonSearchbar
  ],
  declarations: [ProviderFormComponent,ProviderListComponent],
  exports:[ProviderFormComponent,ProviderListComponent]
})
export class ProviderComponentsPageModule {}
