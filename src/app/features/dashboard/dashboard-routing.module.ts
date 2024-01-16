import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'store',
    component: DashboardComponent,
  },
  {
    path: 'store/:storeID',
    component: DetailComponent,
  },
  {
    path: 'store/:storeID/products/:productID',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
