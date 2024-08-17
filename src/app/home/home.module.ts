import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HomePageRoutingModule } from './home-routing.module';
import { AddComponent } from '../components/add/add.component';
import { CalComponent } from '../components/cal/cal.component';
import { IncAddComponent } from '../components/inc-add/inc-add.component';
import { ChartComponent } from '../components/chart/chart.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    HomePage,
    AddComponent,
    CalComponent,
    IncAddComponent,
    ChartComponent
  ],
})
export class HomePageModule {}
