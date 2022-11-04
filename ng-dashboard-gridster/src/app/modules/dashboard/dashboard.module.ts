import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { GridsterModule } from 'angular-gridster2';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridsterModule,
    MaterialModule,
    FormsModule,
    HighchartsChartModule,
  ],
  bootstrap: [],
})
export class DashboardModule { }
