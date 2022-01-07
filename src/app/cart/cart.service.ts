import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from '../auth/cache.service';
import { ICartItem } from './cart';
import { Product } from '../products/product';

export interface ICartService {
  items$: BehaviorSubject<ICartItem[]>;
  addToCart(product: Product): void;
  removeFromCart(product: Product): void;
  decrementQuantity(product: Product, quantity: number): void;
  clearCart(): void;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService extends CacheService implements ICartService {
  items$ = new BehaviorSubject<ICartItem[]>([]);

  constructor() {
    super();
    this.items$.next(this.getItem('cart') as ICartItem[]);
  }

  removeFromCart(product: Product): void {
    let newItems = this.items.filter((i) => i.product._id != product._id);
    this.items$.next(newItems);
    this.saveCart();
  }

  private get items() {
    return this.items$.getValue() || [];
  }

  get count() {
    if (!this.items || this.items.length == 0) return 0;
    return this.items.reduce((a, b) => a + b.quantity, 0);
  }

  decrementQuantity(product: Product, quantity: number = 1): void {
    let item = this.items.find((i) => i.product._id == product._id);
    if (item) {
      item.quantity = item?.quantity - quantity;
      let newItems = this.items.filter((i) => i.product._id == product._id);
      this.items$.next([...newItems, item]);
    }
    this.saveCart();
  }

  clearCart(): void {
    this.items$.next([]);
    this.removeItem('cart');
  }

  addToCart(product: Product) {
    let cartItem: ICartItem;

    let item = this.items.find((i) => i.product._id == product._id);
    if (item) cartItem = { ...item, quantity: item.quantity + 1 };
    else cartItem = { product, quantity: 1 };
    let originalItems = this.items.filter((i) => i.product._id != product._id);
    this.items$.next([...originalItems, cartItem]);
    this.saveCart();
  }

  private saveCart() {
    this.setItem('cart', this.items$.getValue());
  }
}
