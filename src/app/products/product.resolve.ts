import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolve implements Resolve<IProduct> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProduct | Observable<IProduct> | Promise<IProduct> {
    const productId = route.paramMap.get('productId');
    return this.productService.getProduct(productId ?? '');
  }
}
