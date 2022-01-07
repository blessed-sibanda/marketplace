import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CartRoutingModule, AppMaterialModule],
})
export class CartModule {}
