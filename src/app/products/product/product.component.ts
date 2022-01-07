import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { SubSink } from 'subsink';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product = new Product();
  relatedProducts: Product[] = [];
  subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.route.params
      .pipe(tap((params) => this.syncData()))
      .subscribe();
    this.syncData();
  }

  syncData() {
    this.product = this.route.snapshot.data['product'];
    this.productService.relatedProducts(this.product._id).subscribe({
      next: (res) => {
        this.relatedProducts = res;
      },
    });
  }
}
