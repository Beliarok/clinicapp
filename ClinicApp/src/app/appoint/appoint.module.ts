import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointPageRoutingModule } from './appoint-routing.module';

import { AppointPage } from './appoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointPageRoutingModule
  ],
  declarations: [AppointPage]
})
export class AppointPageModule {}
