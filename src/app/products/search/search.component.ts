import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductQuery, ProductService } from '../product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  categories: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.syncData();
    this.buildForm();
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

  searchProducts(submittedForm: FormGroup) {
    let productQuery = submittedForm.value as IProductQuery;
    console.log(submittedForm.value);
    this.productService.searchProducts(productQuery).subscribe({
      next: (res) => {},
    });
  }
}
