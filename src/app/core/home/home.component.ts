import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { combineLatest, Observable, tap } from 'rxjs';
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
  categories: string[] = [];
  subs = new SubSink();
  filteredProducts: Product[] = [];
  categoryIndex = 0;
  query: IProductQuery = { search: '', category: '' };

  constructor(
    private productService: ProductService,
    public media: MediaObserver
  ) {}

  ngOnInit(): void {
    this.syncData();
  }

  getCategoryProducts() {
    this.productService
      .listProductsByCategory(
        this.categoryIndex == 0 ? '' : this.categories[this.categoryIndex - 1]
      )
      .subscribe({ next: (res) => (this.filteredProducts = res) });
  }

  syncData() {
    this.getCategoryProducts();
    this.productService
      .latestProducts()
      .subscribe({ next: (res) => (this.latestProducts = res) });
    this.productService.products$.next([]);
    this.subs.sink = combineLatest([
      this.productService.products$,
      this.productService.listCategories(),
    ])
      .pipe(
        tap(([searchResults, categories]) => {
          this.searchResults = searchResults;
          this.categories = categories.filter((c) => c != '');
        })
      )
      .subscribe();
  }
}
