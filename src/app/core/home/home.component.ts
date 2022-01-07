import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestProducts: Product[] = [];
  searchResults: Product[] = [];
  subs = new SubSink();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.syncData();
    this.subs.sink = this.productService.products$
      .pipe(tap((p) => (this.searchResults = p)))
      .subscribe();
  }

  syncData() {
    this.productService
      .latestProducts()
      .subscribe({ next: (res) => (this.latestProducts = res) });
  }
}
