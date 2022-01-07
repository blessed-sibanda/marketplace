import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MyShopsComponent } from './my-shops/my-shops.component';
import { NewShopComponent } from './new-shop/new-shop.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { ShopComponent } from './shop/shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { ShopResolve } from './shop.resolve';

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
    path: 'shop/:shopId',
    component: ShopComponent,
    resolve: { shop: ShopResolve },
  },
  {
    path: 'shop/:shopId/edit',
    component: EditShopComponent,
    canActivate: [AuthGuard],
    data: { onlySeller: true },
    resolve: { shop: ShopResolve },
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
