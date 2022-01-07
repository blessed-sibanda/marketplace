import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { combineLatest, tap } from 'rxjs';
import { Product } from 'src/app/products/product';
import {
  IProductQuery,
  ProductService,
} from 'src/app/products/product.service';
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
  products: Product[] = [];
  query: IProductQuery = { search: '', category: '' };

  constructor(
    private productService: ProductService,
    public media: MediaObserver
  ) {}

  ngOnInit(): void {
    this.syncData();
    this.subs.sink = combineLatest([this.productService.products$])
      .pipe(
        tap(([searchResults]) => {
          this.searchResults = searchResults;
        })
      )
      .subscribe();
  }

  syncData() {
    this.productService
      .latestProducts()
      .subscribe({ next: (res) => (this.latestProducts = res) });
  }
}
