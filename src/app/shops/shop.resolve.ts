import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IShop } from './shop';
import { ShopService } from './shop.service';

@Injectable()
export class ShopResolve implements Resolve<IShop> {
  constructor(private shopService: ShopService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IShop | Observable<IShop> | Promise<IShop> {
    const shopId = route.paramMap.get('shopId');
    return this.shopService.getShop(shopId ?? '');
  }
}
