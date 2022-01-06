import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MyShopsComponent } from './my-shops/my-shops.component';
import { NewShopComponent } from './new-shop/new-shop.component';
import { AllShopsComponent } from './all-shops/all-shops.component';

const routes: Routes = [
  {
    path: 'my-shops',
    component: MyShopsComponent,
    canActivate: [AuthGuard],
    data: { onlySeller: true },
  },
  {
    path: 'shops/new',
    component: NewShopComponent,
    canActivate: [AuthGuard],
    data: { onlySeller: true },
  },
  {
    path: 'shops',
    component: AllShopsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsRoutingModule {}
