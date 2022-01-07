import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    if (product.quantity > 1) this.cartService.addToCart(product);
  }
}
