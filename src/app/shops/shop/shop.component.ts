import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { Shop } from '../shop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  shop!: Shop;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    public media: MediaObserver,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.shop = this.route.snapshot.data['shop'];
    this.productService
      .listProductsByShop(this.shop._id)
      .subscribe({ next: (res) => (this.products = res) });
  }
}
