import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { take, tap } from 'rxjs';
import { dataURLtoFile } from 'src/app/common/common';
import { UiService } from 'src/app/common/ui.service';
import { NameValidation } from 'src/app/common/validations';
import { IProductData, ProductService } from '../product.service';
import { SubSink } from 'subsink';
import { Product } from '../product';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  subs = new SubSink();
  product = new Product();

  productForm!: FormGroup;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  image: any | undefined | null;

  imagePickerConf: ImagePickerConf = {
    borderRadius: '0px',
    language: 'en',
    width: '210px',
    height: '180px',
    hideDownloadBtn: true,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone,
    private uiService: UiService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onImageChange(event: any) {
    let filename = `${Date.now()}${Math.floor(Math.random() * Date.now())}`;
    this.image = dataURLtoFile(event, filename);
  }

  syncData() {
    this.product = this.route.snapshot.data['product'];
    this.buildForm();
  }

  ngOnInit(): void {
    this.syncData();
    this.subs.sink = this.authService
      .getCurrentUser()
      .pipe(
        tap((u) => {
          if (u._id != this.product.shop.owner._id) {
            this.uiService.showToast('Only shop owner can edit shop products');
            this.router.navigate(['/my-shops']);
          }
        })
      )
      .subscribe();
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, NameValidation],
      description: [this.product.description, [Validators.minLength(10)]],
      quantity: [this.product.quantity, [Validators.min(1)]],
      price: [this.product.price, [Validators.min(0.01)]],
      category: [this.product.category, [Validators.minLength(3)]],
    });
  }

  updateProduct(submittedForm: FormGroup) {
    let productData = submittedForm.value as IProductData;

    productData.file = this.image;

    this.productService
      .updateProduct(this.product.shop._id, this.product._id, productData)
      .subscribe({
        next: (res) => {
          this.uiService.showToast('Product updated successfully!');
          this.router.navigate([`/shop/${this.product.shop._id}/edit`]);
        },
        error: (err) => this.uiService.showToast(err.message),
      });
  }
}
