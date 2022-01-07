import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShopResolve } from '../shops/shop.resolve';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductResolve } from './product.resolve';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: ':shopId/new',
    component: NewProductComponent,
    canActivate: [AuthGuard],
    resolve: { shop: ShopResolve },
  },
  {
    path: 'product/:productId',
    component: ProductComponent,
    resolve: { product: ProductResolve },
  },
  {
    path: 'product/:productId/edit',
    component: EditProductComponent,
    canActivate: [AuthGuard],
    data: { onlySeller: true },
    resolve: { product: ProductResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
