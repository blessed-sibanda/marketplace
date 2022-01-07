import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData() {
    this.productService
      .latestProducts()
      .subscribe({ next: (res) => (this.latestProducts = res) });
  }
}
