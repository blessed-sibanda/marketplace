import { Product } from '../products/product';

export interface ICartItem {
  product: Product;
  quantity: number;
}
