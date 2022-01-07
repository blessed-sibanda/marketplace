import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { NewShopComponent } from './new-shop/new-shop.component';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyShopsComponent } from './my-shops/my-shops.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { ShopComponent } from './shop/shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { ShopResolve } from './shop.resolve';

@NgModule({
  declarations: [
    NewShopComponent,
    MyShopsComponent,
    AllShopsComponent,
    ShopComponent,
    EditShopComponent,
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    NgpImagePickerModule,
    FlexLayoutModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [ShopResolve],
})
export class ShopsModule {}
