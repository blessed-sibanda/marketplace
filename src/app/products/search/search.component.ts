import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { IProductQuery, ProductService } from '../product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  categories: string[] = [];
  searchBtnDisabled = true;
  subs = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.syncData();
    this.buildForm();
    this.subs.sink = this.searchForm.valueChanges
      .pipe(
        debounceTime(100),
        tap((v: IProductQuery) => {
          if (v.search != '' || v.category != '')
            this.productService.searchProducts(v).subscribe();
        })
      )
      .subscribe();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      category: ['', []],
      search: ['', []],
    });
  }

  syncData() {
    this.productService
      .listCategories()
      .subscribe({ next: (res) => (this.categories = res) });
  }
}
