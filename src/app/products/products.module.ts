import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NewProductComponent } from './new-product/new-product.component';
import { AppMaterialModule } from '../app-material.module';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShopResolve } from '../shops/shop.resolve';

@NgModule({
  declarations: [NewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AppMaterialModule,
    NgpImagePickerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [ShopResolve],
})
export class ProductsModule {}
