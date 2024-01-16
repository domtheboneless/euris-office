import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [DashboardComponent, ListComponent, DetailComponent, ChartsComponent],
  imports: [CommonModule, ListRoutingModule],
})
export class DashboardModule {}
